import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../_core/Models/agent';
import { TransferService } from '../../../_core/services/transfer.service';
import { AgentService } from '../../../_core/services/agent.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transfer-by-account-debit',
  templateUrl: './transfer-by-account-debit.component.html',
  styleUrls: ['./transfer-by-account-debit.component.css'],
})
export class TransferByAccountDebitComponent implements OnInit {
  show_user_infos: boolean = false;
  submitted = false;
  errorphone_num?: string = '';
  search_phone_num!: FormGroup;

  user?: Client;

  constructor(
    private formBuilder: FormBuilder,
    public transferService: TransferService,
    private agentServ: AgentService,
    private messageService:MessageService
  ) {}

  invalidphone_num() {
    return this.submitted && this.errorphone_num != '';
  }

  ngOnInit(): void {
    this.search_phone_num = this.formBuilder.group({
      phone_num: ['', Validators.required],
    });
  }

  ngAfterViewInit() {}

  onSubmit() {
    this.submitted = true;
    this.errorphone_num = '';
    if (this.search_phone_num.invalid) this.errorphone_num = 'Champ vide !';
    else {
      this.agentServ
        .getClient_byPH(this.search_phone_num.get('phone_num')?.value)
        .subscribe(
          (data: any) => {
            this.user = data;
            this.show_user_infos = true;
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });

            this.errorphone_num = 'Inexist phone number !';
          }
        );
    }
  }

  set_show_user_infos(show_user_infos: boolean) {
    this.show_user_infos = show_user_infos;
  }

  suivant() {
    this.transferService.multiTransfer.id_client = this.user?.id!;
    this.transferService.multiTransfer.sender_fname = this.user?.firstName!;
    this.transferService.multiTransfer.sender_lname = this.user?.lastName!;
    this.transferService.multiTransfer.sender_phnumber =
      this.user?.phoneNumber!;
    this.transferService.multiTransfer.request_by_prospect_client = false;
    this.transferService.sender_selected = true;
    console.log(this.transferService.multiTransfer);
  }
}
