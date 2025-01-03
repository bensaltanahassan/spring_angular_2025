import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultiTransfer } from '../../_core/Models/Transfer';
import { MultitransfersService } from '../../_core/services/multitransfers.service';
import { AuthenticationService } from '../../_core/services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-transfers',
  templateUrl: './view-transfers.component.html',
  styleUrls: ['./view-transfers.component.css'],
})
export class ViewTransfersComponent implements OnInit {
  multitransfers: MultiTransfer[] = [
    {
      sender_fname: 'Housni',
      sender_lname: 'Elaich',
      sender_phnumber: '0607360043',
      id_multitransfer: 45,
      transfers: [
        {
          id_transfer: 112,
          code_pin: '2323',
          received_at: new Date('14/01/2022'),
          receiver_fname: 'Soukaina',
          receiver_lname: 'Rhasri',
          receiver_phnumber: '0617901909',
          transfer_amount: 800,
          transfer_reference: '113',
          transfer_status: 3,
        },
      ],
      created_at: new Date(),
      ended_at: new Date(),
      expense_id: 2,
      motif: 'Cadeau',
      notify_transfer: true,
      request_by_prospect_client: true,
      sended_by_agent: 2,
      transfer_by_cash: true,
      total_amount: 5000,
      total_expense_amount: 350,
    },
  ];

  totalRecords?: any;
  page: number = 1;
  reference?: string;

  errorReference = '';

  constructor(
    private route: ActivatedRoute,
    private multitransfersService: MultitransfersService,
    private authservice: AuthenticationService,
    private messageService:MessageService,
  ) {
    /*this.route.queryParams.subscribe(params => {
      if(params['page'] != undefined) this.page = params['page'];
    });
    this.getTransfers(this.page);*/
  }

  ngOnInit(): void {
    /*this.multitransfersService.countMultitransfer_byAgent().subscribe((data:any) => {
      this.totalRecords = data;
      }, (error:any) => {
      });*/
  }

  getTransfers(currentpage: number) {
    /*this.multitransfersService.GetMultitransfer_byAgent(currentpage).subscribe((data2:any) => {
        this.multitransfers = data2;
      }, (error:any) => {
        console.log(error);
      });*/
  }

  changepage(currentpage: any) {
    console.log(currentpage);
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

    console.log(this.multitransfers);
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
      this.multitransfersService
        .GetMultitransfer_byreference(this.reference)
        .subscribe(
          (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Succes', detail: "Done!", life: 3000 });

            chercherBtn.innerHTML = 'Chercher';
            chercherBtn.removeAttribute('disabled');
            window.location.href = '/infos_Transfert/' + this.reference;
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
}
