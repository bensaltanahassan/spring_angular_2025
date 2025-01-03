import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../_core/Models/agent';
import { MultitransfersService } from '../../_core/services/multitransfers.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-serve-transfer-by-wallet',
  templateUrl: './serve-transfer-by-wallet.component.html',
  styleUrls: ['./serve-transfer-by-wallet.component.css'],
})
export class ServeTransferByWalletComponent implements OnInit {
  multitransfer?: any;
  reference?: string;
  errorReference = '';
  status: number = 0;
  recipient_infos?: Client;
  phone_number?: string = '';
  valide: boolean = false;
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

  changeStatusPinCodeAndValide() {
    this.valide = true;
    this.pin_code = !this.pin_code;
  }

  chercher() {
    var chercherBtn: any = document.getElementById('chercher-ref-wt');
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
        .GetWalletMultitransfer_byreference(this.reference)
        .subscribe(
          (data: any) => {
            this.multitransfer = data;
            this.status = this.multitransfer.transfers[0].transfer_status;
            chercherBtn.innerHTML = 'Chercher';
            chercherBtn.removeAttribute('disabled');
          },
          (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error?.error?.error,
              life: 3000,
            });

            this.errorReference = error.error.error;
            chercherBtn.innerHTML = 'Chercher';
            chercherBtn.removeAttribute('disabled');
          }
        );
    }
  }

  setBenifice_infos() {
    this.infos_benifice = !this.infos_benifice;
  }

  getBenifice_infos(show_user_infos: any) {
    this.recipient_infos = show_user_infos;
    this.phone_number = this.recipient_infos?.phoneNumber;
  }

  blqstatus() {
    return (
      this.multitransfer?.transfers[0]?.transfer_status == 1 ||
      this.multitransfer?.transfers[0]?.transfer_status == 6
    );
  }
}
