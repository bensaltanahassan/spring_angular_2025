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
import { MultitransfersService } from '../../../_core/services/multitransfers.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recipient-search',
  templateUrl: './recipient-search.component.html',
  styleUrls: ['./recipient-search.component.css'],
})
export class RecipientSearchComponent implements OnInit {
  @Output() show_user_infos = new EventEmitter<boolean>();
  @Output() pin_code = new EventEmitter<boolean>();
  @Input() reference?: string;

  set_user_infos(value: any) {
    this.show_user_infos.emit(value);
  }

  pin_code_exist(value: any) {
    this.pin_code.emit(value);
  }

  @ViewChild('closebutton') closebutton: any;

  client?: any;

  errorAction = '';

  beneficeForm!: FormGroup;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private multitransferSrv: MultitransfersService,
    private messageService: MessageService
  ) {
    this.beneficeForm = new FormGroup({
      receiver_fname: new FormControl('', Validators.required),
      receiver_lname: new FormControl('', Validators.required),
      receiver_phnumber: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  invalidAction() {
    return this.errorAction != '';
  }

  onSubmit() {
    console.log('submit');
    this.errorAction = '';
    if (this.beneficeForm.dirty && this.beneficeForm.valid) {
      console.log('reference', this.reference);
      this.multitransferSrv
        .checkRecipient_byreference(this.reference, this.beneficeForm.value)
        .subscribe(
          (data: any) => {
            this.set_user_infos(data.infos);
            this.pin_code_exist(data.pin);
            var i = document.createElement('li');
            var formElement = document.getElementById('infos_benifice');
            i.setAttribute('data-dismiss', 'modal');
            i.style.display = 'none';
            formElement?.append(i);
            i.click();
            formElement?.removeChild(i);
            i.remove();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'les informations sont les même',
              life: 3000,
            });
          },
          (error: any) => {
            console.log(error);
            this.errorAction = error.error.error;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error?.error?.error,
              life: 3000,
            });
          }
        );
    } else {
      this.errorAction = 'invalid champ !';
    }
  }
}
