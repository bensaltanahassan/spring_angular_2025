import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Client } from '../../../_core/Models/agent';
import { TransferService } from '../../../_core/services/transfer.service';
import { AgentService } from '../../../_core/services/agent.service';

@Component({
  selector: 'app-set-sender-kyc-infos',
  templateUrl: './set-sender-kyc-infos.component.html',
  styleUrls: ['./set-sender-kyc-infos.component.css'],
})
export class SetSenderKycInfosComponent implements OnInit {
  user?: Client;

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
    private agentService: AgentService
  ) {
    this.kycForm = new FormGroup({
      title: new FormControl('Mr .', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      idcard: new FormControl('', Validators.required),
      type_idcard: new FormControl(null, Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      Validity_of_IDCard: new FormControl(false, Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl('Maroc', Validators.required),
      zipcode: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
    });
  }

  ngOnInit(): void {
    //this.agentForm.controls['agency'].setValue(null);
    /*this.agentForm.controls['address'].setValue({
       city:null,
       country : "Maroc",
       address1:'',
       zipcode:'',
      });
    
    this.agencyService.getagencies().subscribe(data => {
      this.agencies=data;
    })*/

    this.cities = [
      { name: 'Marrakech' },
      { name: 'Rabat' },
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
        if (!this.errorEmail && !this.errorbirthday) {
          /* this.agentService.createProspect_Client(this.kycForm.value).subscribe(data=>{
              this.user=this.kycForm.value;
              this.valid_infos = true;
          },(err: any) => {
              this.errorAction = err.error.error;
          }) */
          this.user = this.kycForm.value;
          this.user!.id = 1;
          this.user!.role = 'prospectClient';
          this.valid_infos = true;
        }
      } else {
        this.errorAction = 'Invalid fields !';
      }
    } else {
      this.errorAction = 'Invalid fields !';
    }
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

  suivant() {
    console.log(this.user);
    this.transferService.multiTransfer.id_client = this.user?.id!;
    this.transferService.multiTransfer.sender_fname = this.user?.firstName!;
    this.transferService.multiTransfer.sender_lname = this.user?.lastName!;
    this.transferService.multiTransfer.sender_phnumber =
      this.user?.phoneNumber!;
    this.transferService.multiTransfer.request_by_prospect_client = true;
    this.transferService.sender_selected = true;
  }
}
