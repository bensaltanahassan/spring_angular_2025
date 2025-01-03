import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultiTransfer } from '../../_core/Models/Transfer';
import { MultitransfersService } from '../../_core/services/multitransfers.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-transfers',
  templateUrl: './view-transfers.component.html',
  styleUrls: ['./view-transfers.component.css'],
})
export class ViewTransfersComponent implements OnInit {
  multitransfers: MultiTransfer[] = [];

  totalRecords?: any;
  page: number = 1;
  reference?: string;

  errorReference = '';

  cols: any[] = [];

  status: string[] = [
    'A_servir',
    'Servie',
    'Extourner',
    'Restituer',
    'Bloquer',
    'Debloquer',
    'Desherencer',
  ];

  constructor(
    private route: ActivatedRoute,
    private multitransfersService: MultitransfersService,
    private messageService: MessageService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['page'] != undefined) this.page = params['page'];
    });
    this.getTransfers(this.page);
  }

  ngOnInit(): void {
    this.multitransfersService.countMultitransfer_byAgent().subscribe(
      (data: any) => {
        this.totalRecords = data;
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: 'Done !',
        //   life: 3000,
        // });
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

    this.cols = [
      { field: 'Date de création', header: 'Date de création' },
      { field: 'Expéditeur', header: 'Expéditeur' },
      { field: 'Motif', header: 'Motif' },
      { field: 'Bénéficiaires', header: 'Bénéficiaires' },
      { field: 'Montant total', header: 'Montant total' },
      { field: 'Référence', header: 'Référence' },
      { field: 'Notification', header: 'Notification' },
      { field: 'Statut', header: 'Statut' },
    ];
  }

  getStatus(status: Number): any {
    if (status === 1 || status == 6) {
      return '';
    }
    if (status === 2) {
      return 'success';
    }
    if (status === 4 || status == 3) {
      return 'info';
    }
    if (status === 5 || status == 7) {
      return 'danger';
    }
  }

  giveStatusType(status: number) {
    return { type: this.status[status - 1], ico: this.getStatus(status) };
  }

  getTransfers(currentpage: number) {
    this.multitransfersService.GetMultitransfer_byAgent(currentpage).subscribe(
      (data2: any) => {
        this.multitransfers = data2;
        console.log(data2);
      },
      (error: any) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.error,
          life: 3000,
        });
      }
    );
  }

  changepage(currentpage: any) {
    this.page = currentpage;
    var current_path =
      location.protocol + '//' + location.host + location.pathname;
    window.location.href = current_path + '?page=' + currentpage;
  }

  restituer_transfers(multT: any) {
    let tmp = this.multitransfers[multT];
    tmp.transfers = tmp.transfers.filter((transf: any) => {
      transf['transfer_status'] = 4;
      return transf.transfer_status == 4;
    });
    let index = this.multitransfers.indexOf(tmp);
    this.multitransfers[index] = tmp;
  }

  invalidReference() {
    return this.errorReference != '';
  }

  chercher() {
    var chercherBtn: any = document.getElementById('chercher-btn');
    chercherBtn.innerHTML =
      "<i class='fa fa-circle-o-notch fa-spin fa-fw'></i>";
    chercherBtn.setAttribute('disabled', true);
    this.errorReference = '';
    if (!this.reference) {
      this.errorReference = 'Champ vide !';
      chercherBtn.innerHTML = 'Chercher';
      chercherBtn.removeAttribute('disabled');
    } else {
      this.multitransfersService
        .GetMultitransfer_byreference(this.reference)
        .subscribe(
          (data: any) => {
            chercherBtn.innerHTML = 'Chercher';
            chercherBtn.removeAttribute('disabled');
            window.location.href = '/infos_Transfert/' + this.reference;
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

  onGlobalFilter(table: Table, event: Event) {
    console.log(event);
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
