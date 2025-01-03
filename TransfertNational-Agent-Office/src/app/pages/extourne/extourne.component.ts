import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultiTransfer } from '../../_core/Models/Transfer';
import { MultitransfersService } from '../../_core/services/multitransfers.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-extourne',
  templateUrl: './extourne.component.html',
  styleUrls: ['./extourne.component.css'],
})
export class ExtourneComponent implements OnInit {
  multitransfer!: MultiTransfer;
  status?: number;
  reference?: string;

  formExtourner = false;

  constructor(
    private route: ActivatedRoute,
    private multitransfersService: MultitransfersService,
    private messageService: MessageService
  ) {
    this.reference = this.route.snapshot.params['reference'];
    this.multitransfersService
      .GetMultitransfer_byreference(this.reference)
      .subscribe(
        (data: any) => {
          this.multitransfer = data;
          console.log(this.multitransfer);
        },
        (error: any) => {
          window.location.href = '/list_Transfert';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.error,
            life: 3000,
          });
        }
      );
  }

  ngOnInit(): void {
    this.status = this.multitransfer?.transfers[0].transfer_status;
  }

  afficheExtournerForm() {
    this.formExtourner = !this.formExtourner;
  }

  blqstatus() {
    return (
      this.multitransfer.transfers[0].transfer_status == 1 ||
      this.multitransfer.transfers[0].transfer_status == 6
    );
  }

  setExtortTransfer(multitransfer: any) {
    this.multitransfer = multitransfer;
  }
}
