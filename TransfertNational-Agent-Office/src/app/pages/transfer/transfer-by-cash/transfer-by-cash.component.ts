import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../../_core/services/transfer.service';

@Component({
  selector: 'app-transfer-by-cash',
  templateUrl: './transfer-by-cash.component.html',
  styleUrls: ['./transfer-by-cash.component.css'],
})
export class TransferByCashComponent implements OnInit {
  constructor(public transferService: TransferService) {}

  search_client: boolean = false;
  set_client_info: boolean = false;

  ngOnInit(): void {}

  search_by_CIN() {
    this.search_client = true;
  }

  set_client_infos() {
    this.set_client_info = true;
  }
}
