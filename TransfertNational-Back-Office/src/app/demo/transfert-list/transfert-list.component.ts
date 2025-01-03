import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MultitransfersService } from '../../_core/services/multitransfers.service';
import { MultiTransfer } from '../../_core/Models/Transfer';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transfert-list',
  templateUrl: './transfert-list.component.html',
  styleUrls: ['./transfert-list.component.css'],
})
export class TransfertListComponent implements OnInit {
  multitransfers: MultiTransfer[] = [];

  totalRecords?: any;
  page: number = 1;
  reference?: string;

  errorReference = '';
cols:any[]=[];
  status: string[] = [
    'A_servir',
    'Servie',
    'Extourner',
    'Restituer',
    'Bloquer',
    'Debloquer',
    'Desherencer',
  ];

  constructor(private transferService: MultitransfersService,private messageService:MessageService) {
    this.getTransfers();
    // this.multitransfers =[
    //   {
    //   id_client: 1,
    //   sender_fname: 'John',
    //   sender_lname: 'Doe',
    //   sender_phnumber: '1234567890',
    //   id_multitransfer: 101,
    //   transfers: [
        
    //     {
    //       id_transfer: 5,
    //       code_pin: '12342',
    //       received_at: new Date(),
    //       receiver_fname: 'othman',
    //       receiver_lname: 'karym',
    //       receiver_phnumber: '9876543210',
    //       transfer_amount: 200,
    //       transfer_reference: 'REF1273',
    //       transfer_status: 5,
    //       motif: 'Sample transfer',
    //     },
    //     {
    //       id_transfer: 6,
    //       code_pin: '12342',
    //       received_at: new Date(),
    //       receiver_fname: 'othman',
    //       receiver_lname: 'karym',
    //       receiver_phnumber: '9876543210',
    //       transfer_amount: 200,
    //       transfer_reference: 'REF1273',
    //       transfer_status: 6,
    //       motif: 'Sample transfer',
    //     },
    //     {
    //       id_transfer: 7,
    //       code_pin: '12342',
    //       received_at: new Date(),
    //       receiver_fname: 'othman',
    //       receiver_lname: 'karym',
    //       receiver_phnumber: '9876543210',
    //       transfer_amount: 200,
    //       transfer_reference: 'REF1273',
    //       transfer_status: 7,
    //       motif: 'Sample transfer',
    //     },
    //   ],
    //   created_at: new Date(),
    //   ended_at: new Date(),
    //   expense_id: 201,
    //   motif: 'Sample multi-transfer',
    //   notify_transfer: true,
    //   request_by_prospect_client: false,
    //   sended_by_agent: 2,
    //   transfer_by_cash: true,
    //   total_amount: 1500,
    //   total_expense_amount: 50,
    // },
    // {
    //   id_client: 1,
    //   sender_fname: 'moha',
    //   sender_lname: 'Doe',
    //   sender_phnumber: '1234567890',
    //   id_multitransfer: 101,
    //   transfers: [
        
    //     {
    //       id_transfer: 5,
    //       code_pin: '12342',
    //       received_at: new Date(),
    //       receiver_fname: 'othman',
    //       receiver_lname: 'karym',
    //       receiver_phnumber: '9876543210',
    //       transfer_amount: 200,
    //       transfer_reference: 'REF1273',
    //       transfer_status: 5,
    //       motif: 'Sample transfer',
    //     },
    //     {
    //       id_transfer: 6,
    //       code_pin: '12342',
    //       received_at: new Date(),
    //       receiver_fname: 'othman',
    //       receiver_lname: 'karym',
    //       receiver_phnumber: '9876543210',
    //       transfer_amount: 200,
    //       transfer_reference: 'REF1273',
    //       transfer_status: 6,
    //       motif: 'Sample transfer',
    //     },
    //     {
    //       id_transfer: 7,
    //       code_pin: '12342',
    //       received_at: new Date(),
    //       receiver_fname: 'othman',
    //       receiver_lname: 'karym',
    //       receiver_phnumber: '9876543210',
    //       transfer_amount: 200,
    //       transfer_reference: 'REF1273',
    //       transfer_status: 7,
    //       motif: 'Sample transfer',
    //     },
    //   ],
    //   created_at: new Date(),
    //   ended_at: new Date(),
    //   expense_id: 201,
    //   motif: 'Sample multi-transfer',
    //   notify_transfer: true,
    //   request_by_prospect_client: false,
    //   sended_by_agent: 2,
    //   transfer_by_cash: true,
    //   total_amount: 1500,
    //   total_expense_amount: 50,
    // },];
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'created_at', header: 'Date de création' },
      { field: 'sender_fname', header: 'Expéditeur' },
      { field: 'motif', header: 'Motif' },
      { field: 'transfers.receiver_fname', header: 'Bénéficiaires' },
      { field: 'total_amount', header: 'Montant total' },
      { field: 'transfers.transfer_reference', header: 'Référence' },
      { field: 'transfers.transfer_status', header: 'Statut' },
  ];
    
  }

  getTransfers() {
    this.transferService.GetMultitransfers().subscribe(
      (data2: any) => {
        this.multitransfers = data2;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Done!", life: 3000 });

      },
      (error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });

      }
    );
  }

  // changepage(currentpage: any) {
  //   this.page = currentpage;
  //   var current_path =
  //     location.protocol + '//' + location.host + location.pathname;
  //   window.location.href = current_path + '?page=' + currentpage;
  // }

  restituer_transfers(multT: any) {
    let tmp = this.multitransfers[multT];
    tmp.transfers = tmp.transfers.filter((transf: any) => {
      transf['transfer_status'] = 4;
      return transf.transfer_status == 4;
    });
    let index = this.multitransfers.indexOf(tmp);
    this.multitransfers[index] = tmp;
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

  invalidReference() {
    return this.errorReference != '';
  }

  chercher() {
    var chercherBtn: any = document.getElementById('chercher-transfert');
    chercherBtn.innerHTML =
      "<i class='fa fa-circle-o-notch fa-spin fa-fw'></i>";
    chercherBtn.setAttribute('disabled', true);
    this.errorReference = '';
    if (!this.reference) {
      this.errorReference = 'Champ vide !';
      chercherBtn.innerHTML = 'Chercher';
      chercherBtn.removeAttribute('disabled');
    } else {
      this.transferService
        .GetMultitransfer_byreference(this.reference)
        .subscribe(
          (data: any) => {
            chercherBtn.innerHTML = 'Chercher';
            chercherBtn.removeAttribute('disabled');
            window.location.href = '/extourne_transfert/' + this.reference;
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });
            this.errorReference = error.error.error;
            chercherBtn.innerHTML = 'Chercher';
            chercherBtn.removeAttribute('disabled');
          }
        );
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
        (event.target as HTMLInputElement).value,
        'contains'
    );
}
giveStatusType(status: number) {
  return { type: this.status[status - 1], ico: this.getStatus(status) };
}
}
