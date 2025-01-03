import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_core/services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class AuthentificationComponent implements OnInit {

  errors : any = false;

  submitted = false;
  backoffice !: FormGroup;

  constructor(private formBuilder : FormBuilder,
    private authService : AuthenticationService,
    private messageService:MessageService,
    private router: Router,) { }

  ngOnInit(): void {
    this.backoffice = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
  }

  onSubmit(){

    this.errors = false;
    this.submitted=true;
  
    if(this.backoffice.value.email!=""){
      this.authService.login({
        "email": this.backoffice.value.email,
        "password": this.backoffice.value.password
      }).subscribe( (response : any) => {
       
        if(response.message){
        } else {
          window.localStorage.setItem('token',response.token);
          window.localStorage.setItem('id',response.id);
          // window.location.reload();
          this.router.navigate(['/']);

        }
      }, (error:any) => {
        this.errors = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });
        
      });
    }
  }

  invalidPassword():boolean{
  	return (this.submitted && this.backoffice.controls['password'].errors != null );
  }

  invalidEmailUtili():boolean{
  	return (this.submitted &&  this.backoffice.controls['email'].errors != null);
  }

}

    

