import { Component, OnInit, Input } from '@angular/core';
import { MainDebitComponent } from '../main-debit/main-debit.component';

@Component({
  selector: 'app-beneficiaries-list-debit',
  templateUrl: './beneficiaries-list-debit.component.html',
  styleUrls: ['./beneficiaries-list-debit.component.css'],
})
export class BeneficiariesListDebitComponent implements OnInit {
  toggle: boolean = false;

  @Input() id_client?: number;
  cols: any[] = [];

  constructor(public mainComponent: MainDebitComponent) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'Nom Complet', header: 'Nom Complet' },
      { field: 'Numéro du téléphone', header: 'Numéro du téléphone' },
      { field: 'Montant (DH)', header: 'Montant (DH)' },
    ];
  }

  fullName(transfer: any): String {
    return transfer.receiver_fname + ' ' + transfer.receiver_lname;
  }

  ngAfterViewInit(): void {
    // HTML elements
    // var accordian_button: any =
    //   document.getElementsByClassName('accordian-button')[0];
    // accordian_button.addEventListener('click', () => {
    //   this.toggle = !this.toggle;
    // });
  }
}
