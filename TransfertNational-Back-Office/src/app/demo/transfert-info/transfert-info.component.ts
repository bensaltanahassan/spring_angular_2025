import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultitransfersService } from '../../_core/services/multitransfers.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transfert-info',
  templateUrl: './transfert-info.component.html',
  styleUrls: ['./transfert-info.component.css'],
})
export class TransfertInfoComponent implements OnInit {
  multitransfer: any = {
    sender_fname: 'Housni',
    sender_lname: 'Elaich',
    sender_phnumber: '0607360043',
    id_multitransfer: '45',
    transfers: [
      {
        id_transfer: 112,
        code_pin: 2323,
        received_at: new Date(),
        receiver_fname: 'Soukaina',
        receiver_lname: 'Rhasri',
        receiver_phnumber: '0617901909',
        transfer_amount: 800,
        transfer_reference: 113,
        transfer_status: 2,
      },
      {
        id_transfer: 112,
        code_pin: 2323,
        received_at: new Date(),
        receiver_fname: 'Soukaina',
        receiver_lname: 'Rhasri',
        receiver_phnumber: '0617901909',
        transfer_amount: 800,
        transfer_reference: 113,
        transfer_status: 4,
      },
    ],
    created_at: new Date(),
    ended_at: new Date(),
    expense_id: new Date(),
    motif: 'Cadeau',
    notify_transfer: true,
    request_by_prospect_client: true,
    sended_by_agent: true,
    transfer_by_cash: true,
    total_amount: 5000,
    total_expense_amount: 350,
  };

  status: string[] = [
    'A_servir',
    'Servie',
    'Extourner',
    'Restituer',
    'Bloquer',
    'Debloquer',
    'Desherencer',
  ];

  statusSelected: number = 0;
  onSubmit(stat: number) {
    this.statusSelected = stat;
  }

  constructor(
    private route: ActivatedRoute,
    private transferService: MultitransfersService,
    private messageService:MessageService,
  ) {
    this.route.params.subscribe( params => {
      this.transferService.GetMultitransfer_byreference(params["reference"]).subscribe((res) => {
        this.multitransfer = res;
      }, (err) => {
        // alert(err.message);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.error, life: 3000 });

      })
    } )
  }

  ngOnInit(): void {}
}
