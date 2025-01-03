import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MultitransfersService } from '../../../_core/services/multitransfers.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pincode-check',
  templateUrl: './pincode-check.component.html',
  styleUrls: ['./pincode-check.component.css'],
})
export class PincodeCheckComponent implements OnInit {
  @Input() reference?: string;

  client?: any;

  errorAction = '';

  code_pinForm!: FormGroup;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private multitransferSrv: MultitransfersService,
    private messageService:MessageService,
  ) {
    this.code_pinForm = new FormGroup({
      code_pin: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  invalidAction() {
    return this.errorAction != '';
  }

  onSubmit() {
    this.errorAction = '';
    if (this.code_pinForm.dirty && this.code_pinForm.valid) {
      this.multitransferSrv
        .checkTransfer_code_pin(
          this.reference,
          this.code_pinForm.controls['code_pin'].value
        )
        .subscribe(
          (data: any) => {
            this.multitransferSrv
              .ServeTransfer_byreference(this.reference)
              .subscribe(
                (data: any) => {
                  window.location.href = 'infos_Transfert/' + this.reference;
                },
                (error: any) => {
                  this.errorAction = error.error.error;
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });

                }
              );
          },
          (error: any) => {
            this.errorAction = error.error.error;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });

          }
        );
    } else {
      this.errorAction = 'invalid champ !';
    }
  }
}
