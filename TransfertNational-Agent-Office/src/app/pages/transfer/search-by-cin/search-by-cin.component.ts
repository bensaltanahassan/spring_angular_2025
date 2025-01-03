import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../_core/Models/agent';
import { TransferService } from '../../../_core/services/transfer.service';
import { AgentService } from '../../../_core/services/agent.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-search-by-cin',
  templateUrl: './search-by-cin.component.html',
  styleUrls: ['./search-by-cin.component.css'],
})
export class SearchByCinComponent implements OnInit {
  show_user_infos: boolean = false;
  submitted = false;
  errorCin?: string = '';
  search_cin!: FormGroup;

  user?: Client;

  constructor(
    private formBuilder: FormBuilder,
    private transferService: TransferService,
    private agentServ: AgentService,
    private messageService:MessageService
  ) {}

  invalidcin() {
    return this.submitted && this.errorCin != '';
  }

  ngOnInit(): void {
    this.search_cin = this.formBuilder.group({
      cin: ['', Validators.required],
    });
  }

  ngAfterViewInit() {}

  onSubmit() {
    this.submitted = true;
    this.errorCin = '';
    if (this.search_cin.invalid) this.errorCin = 'Champ vide !';
    else {
      this.agentServ
        .getClient_byCIN(this.search_cin.get('cin')?.value)
        .subscribe(
          (data: any) => {
            this.user = data;
            if (this.user != undefined) this.user.role = 'client';
            this.show_user_infos = true;
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });
            this.errorCin = error.error.error;
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
  }
}
