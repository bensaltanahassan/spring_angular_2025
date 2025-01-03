import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../../_core/Models/agent';

@Component({
  selector: 'app-kyc-table',
  templateUrl: './kyc-table.component.html',
  styleUrls: ['./kyc-table.component.css'],
})
export class KycTableComponent implements OnInit {
  @Input() user?: Client;

  showVar: boolean = true;
  public compte: any;
  constructor() {}

  ngOnInit(): void {}
}
