import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MultitransfersService } from '../../../_core/services/multitransfers.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-extourne-modal',
  templateUrl: './extourne-modal.component.html',
  styleUrls: ['./extourne-modal.component.css'],
})
export class ExtourneModalComponent implements OnInit {
  motif?: string;
  errorAction = '';

  @Input() reference?: string;

  @Output() extort_transfer = new EventEmitter<boolean>();

  extorting_transfer(value: any) {
    this.extort_transfer.emit(value);
  }

  constructor(
    private multitransfersService: MultitransfersService,
    private messageService:MessageService
    ) {}

  ngOnInit(): void {}

  invalidAction() {
    return this.errorAction != '';
  }

  onSubmit() {
    this.errorAction = '';
    if (!this.motif) this.errorAction = 'Champ vide !';
    else {
      this.multitransfersService
        .ExtortTransfer_byreference(this.reference, this.motif)
        .subscribe(
          (data: any) => {
            this.extorting_transfer(data);
            var i = document.createElement('li');
            var formElement = document.getElementById('extourner');
            i.setAttribute('data-dismiss', 'modal');
            i.style.display = 'none';
            formElement?.append(i);
            i.click();
            formElement?.removeChild(i);
            i.remove();
          },
          (error: any) => {
            this.errorAction = error.error.error;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });

          }
        );
    }
  }
}
