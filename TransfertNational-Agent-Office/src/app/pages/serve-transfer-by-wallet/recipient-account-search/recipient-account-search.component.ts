import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Client } from '../../../_core/Models/agent';
import { AgentService } from '../../../_core/services/agent.service';
import { MultitransfersService } from '../../../_core/services/multitransfers.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recipient-account-search',
  templateUrl: './recipient-account-search.component.html',
  styleUrls: ['./recipient-account-search.component.css'],
})
export class RecipientAccountSearchComponent implements OnInit {
  @Output() show_user_infos = new EventEmitter<Client>();
  @Input() reference?: string;

  set_user_infos(value: any) {
    this.show_user_infos.emit(value);
  }

  client?: Client;

  errorAction = '';
  beneficeForm!: FormGroup;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private multitransferSrv: MultitransfersService,
    private agentSrv: AgentService,
    private messageService:MessageService
  ) {
    this.beneficeForm = new FormGroup({
      account: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  invalidAction() {
    return this.errorAction != '';
  }

  onSubmit() {
    this.errorAction = '';
    if (this.beneficeForm.dirty && this.beneficeForm.valid) {
      this.agentSrv
        .getClient_byAccount(this.beneficeForm.controls['account'].value)
        .subscribe(
          (data: any) => {
            this.set_user_infos(data);
            var i = document.createElement('li');
            var formElement = document.getElementById('infos_benifice');
            i.setAttribute('data-dismiss', 'modal');
            i.style.display = 'none';
            formElement?.append(i);
            i.click();
            formElement?.removeChild(i);
            i.remove();
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });

            console.log(error);
            this.errorAction = error.error.error;
          }
        );
    } else {
      this.errorAction = 'invalid champ !';
    }
  }
}
