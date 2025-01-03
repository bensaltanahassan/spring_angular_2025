import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-infos',
  templateUrl: './transfer-infos.component.html',
  styleUrls: ['./transfer-infos.component.css'],
})
export class TransferInfosComponent implements OnInit {
  @Input() multitransfer!: any;

  status: string[] = [
    'A_servir',
    'Servie',
    'Extourner',
    'Restituer',
    'Bloquer',
    'Debloquer',
    'Desherencer',
  ];
  reference?: string;

  constructor() {}

  ngOnInit(): void {
    // console.log(this.multitransfer);
  }
}
