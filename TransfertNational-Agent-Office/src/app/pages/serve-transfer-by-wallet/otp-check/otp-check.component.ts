import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AgentService } from '../../../_core/services/agent.service';
import { MultitransfersService } from '../../../_core/services/multitransfers.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-otp-check',
  templateUrl: './otp-check.component.html',
  styleUrls: ['./otp-check.component.css'],
})
export class OtpCheckComponent implements OnInit {
  @Input() phone_number?: string;
  @Input() reference?: string;

  client?: any;

  errorAction = '';
  otpForm!: FormGroup;
  otp_code?: string;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private multitransferSrv: MultitransfersService,
    private agentsrv: AgentService,
    private messageService:MessageService
  ) {
    this.otpForm = new FormGroup({
      otp: new FormControl('', Validators.required),
    });
    this.otp_code = this.makeotp(8);
  }

  ngOnInit(): void {
    this.agentsrv
      .sendOtpToClient(this.otp_code, this.phone_number?.replace('+', ''))
      .subscribe(
        (data: any) => {},
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });

          this.errorAction = error.error.error;
        }
      );
  }

  invalidAction() {
    return this.errorAction != '';
  }

  onSubmit() {
    this.errorAction = '';
    if (this.otpForm.dirty && this.otpForm.valid) {
      if (this.otp_code == this.otpForm.controls['otp'].value) {
        this.multitransferSrv.checkIfClientBlocked(this.client).subscribe(
          (val) => {
            this.errorAction = 'black lister';
          },
          (err) => {
            this.multitransferSrv
              .ServeWalletTransfer_byreference(this.reference)
              .subscribe(
                (data: any) => {
                  window.location.href = 'infos_Transfert/' + this.reference;
                },
                (error: any) => {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });

                  this.errorAction = error.error.error;
                }
              );
          }
        );
      } else {
        this.errorAction = 'Code incorrect !';
      }
    } else {
      this.errorAction = 'invalid champ !';
    }
  }

  makeotp(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
