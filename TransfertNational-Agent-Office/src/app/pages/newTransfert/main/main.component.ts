import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultitransfersService } from '../../../_core/services/multitransfers.service';
import { TransferService } from '../../../_core/services/transfer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, AfterViewInit {
  submitted: boolean = false;
  error: String = '';
  transfer!: FormGroup;

  frais: any[] = [
    { name: "Frais à la charge du client donneur d'ordre", value: 1 },
    { name: 'Frais à la charge du client bénéficiaire', value: 2 },
    { name: 'Frais partagé entre les clients', value: 3 },
  ];
  motifs: Array<any> = [
    { name: 'Soutien familial' },
    { name: 'Epargne/investissement' },
    { name: 'Cadeau' },
    { name: 'Paiement de biens et de services' },
    { name: 'Frais de dépassement' },
    { name: 'Frais d’éducation' },
    { name: 'Location/Hypothèque' },
    { name: 'Aide de secours/Médicale' },
    { name: 'Revenu d’un site internet' },
    { name: 'Dépenses salariales' },
    { name: 'Frais de loterie ou récompense/taxes' },
    { name: 'Prêt' },
    { name: 'Commerce sur internet' },
  ];

  id_client?: number;

  constructor(
    public transferT: TransferService,
    private formBuilder: FormBuilder,
    private multitransferSrv: MultitransfersService,
    private messageService:MessageService
  ) {
    this.id_client = this.transferT.multiTransfer.id_client;
  }

  ngOnInit(): void {
    this.transfer = this.formBuilder.group({
      motif: ['Soutien familial', Validators.required],
      frais: ['1', Validators.required],
    });
  }

  invalidMotif() {
    return this.submitted && this.transfer.controls['motif'].errors != null;
  }

  ngAfterViewInit(): void {
    // Set today date
    var today = new Date();
    var creation_date: any = document.getElementById('creation_date');
    creation_date.value = this.getWellFormedDate(today);
    this.ajouterBeneficiaire(this);

    //
    // var notifier: any = document.getElementById('notifier');
    // notifier.onclick = () => {
    //   this.transferT.toggleNotitfication();
    // };
  }

  montantTotal(): number {
    var montant = this.transferT.multiTransfer.total_amount;
    var frais = this.transferT.multiTransfer.total_expense_amount;
    if (this.transferT.multiTransfer.notify_transfer) {
      return montant + frais + this.notifyFrais();
    }
    return montant + frais;
  }

  notifyFrais() {
    return Math.round(this.transferT.multiTransfer.total_amount * 0.025);
  }

  getWellFormedDate(date: Date) {
    var elems = date.toISOString().split('T')[0].split('-');
    return elems[2] + '/' + elems[1] + '/' + elems[0];
  }

  ajouterBeneficiaire(mainComponent: MainComponent) {
    $('#add_container').on('DOMNodeInserted', function (event) {
      if (
        $(event.target).is('DIV') &&
        event.target.classList.value === 'formGroup'
      ) {
        if (mainComponent.transferT.multiTransfer.transfers.length != 0) {
          var minus_button: any = event.target.lastChild?.firstChild;
          let index =
            mainComponent.transferT.multiTransfer.transfers.length - 1;
          minus_button.onclick = () => {
            mainComponent.transferT.supprimer(
              mainComponent.transferT.multiTransfer.transfers[index]
            );
          };
        }
      }
    });
  }

  submit() {
    var transfer: any = document.getElementById('transfer');
    transfer.innerHTML = "<i class='fa fa-circle-o-notch fa-spin fa-fw'></i>";
    transfer.setAttribute('disabled', true);
    this.error = '';
    this.submitted = true;
    setTimeout(() => {
      if (this.transfer.invalid) {
        transfer.innerHTML = 'Transférer';
        transfer.removeAttribute('disabled');
        return;
      }
      if (this.transferT.multiTransfer.transfers.length == 0) {
        transfer.innerHTML = 'Transférer';
        this.error = 'Citez au moins un bénéficiaire!';
        transfer.removeAttribute('disabled');
        return;
      }
      if (this.transferT.multiTransfer.total_amount > 80000) {
        transfer.innerHTML = 'Transférer';
        this.error = 'Montant du transfert dépasse 80 000 DH';
        transfer.removeAttribute('disabled');
        return;
      }

      this.transferT.transfer_byCash(
        this.transfer.controls['motif'].value,
        Number(this.transfer.controls['frais'].value)
      );
      console.log(this.transferT.multiTransfer);
      this.multitransferSrv
        .setTransfer_byCash(this.transferT.multiTransfer)
        .subscribe(
          (data: any) => {
            transfer.innerHTML = 'Transférer';
            transfer.removeAttribute('disabled');
            console.log(data);
            window.location.href = 'list_Transfert';
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });

            transfer.innerHTML = 'Transférer';
            transfer.removeAttribute('disabled');
            console.log(error);
            this.error = error.error.error;
          }
        );
    }, 1000);
  }

  retour() {
    this.transferT.sender_selected = false;
  }
}
