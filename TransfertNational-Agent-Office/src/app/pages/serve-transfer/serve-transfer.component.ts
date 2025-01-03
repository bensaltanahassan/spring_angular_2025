import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../_core/Models/agent';
import { MultitransfersService } from '../../_core/services/multitransfers.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-serve-transfer',
  templateUrl: './serve-transfer.component.html',
  styleUrls: ['./serve-transfer.component.css'],
})
export class ServeTransferComponent implements OnInit {
  multitransfer?: any;
  reference?: string;
  errorReference = '';
  status: number = 0;
  pin_code_ex: boolean = false;
  recipient_infos?: Client;
  infos_benifice = false;
  pin_code = false;

  constructor(
    private route: ActivatedRoute,
    private multitransfersSrv: MultitransfersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  invalidReference() {
    return this.errorReference != '';
  }

  chercher() {
    var chercherBtn: any = document.getElementById('cherche-ref');
    chercherBtn.innerHTML =
      "<i class='fa fa-circle-o-notch fa-spin fa-fw'></i>";
    chercherBtn.setAttribute('disabled', true);
    this.errorReference = '';
    if (!this.reference) {
      this.errorReference = 'Champ vide !';
      chercherBtn.innerHTML = 'Chercher';
      chercherBtn.removeAttribute('disabled');
    } else {
      this.multitransfersSrv
        .GetMultitransfer_byreference(this.reference)
        .subscribe(
          (data: any) => {
            this.multitransfer = data;
            this.status = this.multitransfer.transfers[0].transfer_status;
            chercherBtn.innerHTML = 'Chercher';
            chercherBtn.removeAttribute('disabled');
          },
          (error: any) => {
            this.errorReference = error.error.error;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error?.error?.error,
              life: 3000,
            });
            chercherBtn.innerHTML = 'Chercher';
            chercherBtn.removeAttribute('disabled');
          }
        );
    }
  }

  setBenifice_infos() {
    this.infos_benifice = !this.infos_benifice;
  }

  changePinCodeStatus() {
    this.pin_code = !this.pin_code;
  }

  getBenifice_infos(show_user_infos: any) {
    this.recipient_infos = show_user_infos;
    console.log(show_user_infos);
  }

  blqstatus() {
    return (
      this.multitransfer?.transfers[0]?.transfer_status == 1 ||
      this.multitransfer?.transfers[0]?.transfer_status == 6
    );
  }

  serve_transfer() {
    this.multitransfersSrv.ServeTransfer_byreference(this.reference).subscribe(
      (data: any) => {
        window.location.href = 'infos_Transfert/' + this.reference;
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.error,
          life: 3000,
        });
      }
    );
  }

  pin_code_exist(value: any) {
    this.pin_code_ex = value;
  }
}
