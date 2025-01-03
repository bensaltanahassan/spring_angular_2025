import { Component, OnInit } from '@angular/core';
import { Agent } from '../../../_core/Models/agent';
import { AgentService } from '../../../_core/services/agent.service';
import { AuthenticationService } from '../../../_core/services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  // agent ?: Observable<agent>;
  agent?: Agent;
  editPwordInd: Boolean = false;

  ancienPword?: string;
  NouveauPword: string = '';
  ConfirmPword: string = '';
  errors: any = {};

  constructor(
    private agentService: AgentService,
    private authService: AuthenticationService,
    private messageService:MessageService
  ) {}

  ngOnInit() {
    var id = +localStorage.getItem('id')!;
    this.authService.getCurrentUser(id).subscribe((resp) => {
      this.agent = resp;
      console.log(resp);
    },err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "User Not Found !", life: 3000 });

    });
  }

  editPword() {
    this.editPwordInd = true;
  }

  updatePword() {
    this.errors = {};
    if (this.NouveauPword.length >= 8) {
      if (this.NouveauPword == this.ConfirmPword) {
        console.log(this.ancienPword);
        this.agentService
          .updatepwd({
            currentPassword: this.ancienPword,
            newPassword: this.NouveauPword,
          })
          .subscribe(
            (data1: any) => {
              this.authService.Logout();
            },
            (err: any) => {
              this.errors.currentpwd = 'Mot de passe incorrect !';
              this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.error, life: 3000 });

            }
          );
      } else {
        this.errors.confirmpwd = 'Invalide !';
      }
    } else {
      console.log('err8');
      this.errors.nouveaupwd = 'Au moins 8 characters !';
    }
  }

  annuler() {
    this.editPwordInd = !this.editPwordInd;
  }
}
