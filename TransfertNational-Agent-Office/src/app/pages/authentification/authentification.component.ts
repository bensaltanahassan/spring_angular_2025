import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_core/services/authentication.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
})
export class AuthentificationComponent implements OnInit {
  errors: any = false;

  submitted = false;
  agent!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private messageService:MessageService
  ) {}

  ngOnInit(): void {
    this.agent = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    // console.log(this.agent);
    // var authBtn: any = document.getElementsByClassName('auth')[0];
    // console.log(authBtn);
    // authBtn.innerHTML = "<i class='fa fa-circle-o-notch fa-spin fa-fw'></i>";
    // authBtn.setAttribute('disabled', true);
    this.errors = false;
    this.submitted = true;
    // if (this.agent.invalid) {
    //   authBtn.innerHTML = "S'Authentifier";
    //   authBtn.removeAttribute('disabled');
    //   return;
    // }
    if (this.agent.value.email != '') {
      this.authService
        .login({
          email: this.agent.value.email,
          password: this.agent.value.password,
        })
        .subscribe(
          (response: any) => {
            // authBtn.innerHTML = "S'Authentifier";
            // authBtn.removeAttribute('disabled');
            if (response.message) {
            } else {
              window.localStorage.setItem('token', response.token);
              window.localStorage.setItem('id', response.id);
              //window.location.reload();
              this.router.navigate(['/']);
            }
          },
          (error: any) => {
            this.errors = true;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });
            // authBtn.innerHTML = "S'Authentifier";
            // authBtn.removeAttribute('disabled');
          }
        );
    }
  }

  invalidPassword(): boolean {
    return this.submitted && this.agent.controls['password'].errors != null;
  }

  invalidEmailUtili(): boolean {
    return this.submitted && this.agent.controls['email'].errors != null;
  }
}
