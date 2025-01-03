import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Client } from '../../../_core/Models/agent';
import { AgentService } from '../../../_core/services/agent.service';
import { TransferService } from '../../../_core/services/transfer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  providers: [MessageService],
})
export class AddClientComponent implements OnInit {
  user?: Client;
  ishide:boolean=false;
  valid_infos: boolean = false;

  titles: any = [{ name: 'Mr .' }, { name: 'Mme .' }];

  videError: boolean = false;

  set_type_idcard: boolean = false;

  errorbirthday = '';
  errorEmail = '';
  errorAction = '';

  kycForm!: FormGroup;
  cities!: any[];
  type_idcards!: any[];

  invalidbirthday() {
    return this.errorbirthday != '';
  }

  invalidEmail() {
    return this.errorEmail != '';
  }

  invalidAction() {
    return this.errorAction != '';
  }

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private transferService: TransferService,
    private agentService: AgentService,
    private messageService: MessageService
  ) {
    this.kycForm = new FormGroup({
      title: new FormControl('Mr .', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      idCard: new FormControl('', Validators.required),
      type_idcard: new FormControl(null, Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      Validity_of_IDCard: new FormControl(false, Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl('Maroc', Validators.required),
      zipcode: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.cities = [
      { name: 'Marrakech' },
      { name: 'Rabat' },
      { name: 'Safi' },
      { name: 'Casablanca' },
      { name: 'Tanger' },
      { name: 'Paris' },
    ];
    this.type_idcards = [{ name: 'CIN' }];
  }

  submit() {
    
    this.videError = false;
    this.errorbirthday = '';
    this.errorEmail = '';
    this.errorAction = '';
    var birthday = new Date(this.kycForm.value.birthday);
    var today = new Date();
    if (
      today.getFullYear() - birthday.getFullYear() <= 18 &&
      today.getMonth() - birthday.getMonth() <= 0
    ) {
      this.errorbirthday = 'l’Age légal (18 ans) !';
    }

    if (this.kycForm.controls['email'].status == 'INVALID') {
      this.errorEmail = 'Email invalide !';
    }
    if (this.kycForm.dirty) {
      if (this.kycForm.valid) {
        if (!this.errorbirthday) {
          this.user = this.kycForm.value;
          this.user!.role = 'client';
          this.user!.password = 'password';
          this.valid_infos = true;
        }
      } else {
        this.errorAction = 'Invalid fields !';
      }
    } else {
      this.errorAction = 'Invalid fields !';
    }
    this.ishide=true;
  }

  valide() {
    this.agentService.createClient(this.user).subscribe(
      (data: any) => {
        window.location.reload();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Cleint ajouter',
          life: 3000,
        });
        
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });
        console.log(error);
      }
    );
  }
  annuler(){
    this.ishide=false;
  }
  reset() {
    this.kycForm.reset();
    this.kycForm.controls['country'].setValue('Maroc');
    this.kycForm.controls['title'].setValue('Mr .');
    this.set_type_idcard = false;
  }

  set_id_type(event: any) {
    this.set_type_idcard = true;
  }

  set_show_user_infos(show_user_infos: boolean) {
    this.valid_infos = show_user_infos;
  }
}
