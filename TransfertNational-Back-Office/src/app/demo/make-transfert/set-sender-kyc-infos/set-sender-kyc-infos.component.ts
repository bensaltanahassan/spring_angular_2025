import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { utilisateur } from '../../../_core/Models/utilisateur';

@Component({
  selector: 'app-set-sender-kyc-infos',
  templateUrl: './set-sender-kyc-infos.component.html',
  styleUrls: ['./set-sender-kyc-infos.component.css'],
})
export class SetSenderKycInfosComponent implements OnInit {
  user?: utilisateur;

  valid_infos: boolean = false;

  titles: any = [{ name: 'Mr .' }, { name: 'Mme .' }];

  videError: boolean = false;

  set_type_idcard: boolean = false;

  errorbirthday = '';
  errorEmail = '';

  kycForm!: FormGroup;

  invalidbirthday() {
    return this.errorbirthday != '';
  }

  invalidEmail() {
    return this.errorEmail != '';
  }

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
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
  }

  submit() {
    this.videError = false;
    this.errorbirthday = '';
    this.errorEmail = '';
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
        /* this.agencyService.createAgent(this.agentForm.controls['agency'].value.id, this.agentForm.value).subscribe(data=>{
          window.location.reload();
        },(err: any) => {
          if(err.error.errors.email){
            this.errorEmail = err.error.errors.email[0];
          }
          if(err.error.errors.idcard){
            this.errorIdcard = err.error.errors.idcard[0];
          }
        })*/
        if (!this.errorEmail && !this.errorbirthday) {
          this.user = this.kycForm.value;
          this.valid_infos = true;
        }
      } else {
        this.videError = true;
      }
    } else {
      this.videError = true;
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
}
