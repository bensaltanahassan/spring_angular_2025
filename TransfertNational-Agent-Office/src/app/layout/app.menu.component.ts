import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AuthenticationService } from '../_core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: [],
})
export class AppMenuComponent implements OnInit, AfterViewInit {
  isAuthenticated: boolean = false;
  nom?: String;
  initialElement: String = '';
  model: any[] = [];
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public el: ElementRef
  ) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Infos',
        items: [
          { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/profile'],
          },
        ],
      },
      {
        label: 'Transfert',
        items: [
          {
            label: 'Liste de transfert',
            icon: 'pi pi-sort-alt',
            routerLink: ['/list_Transfert'],
          },
          {
            label: 'Servir un transfert (bénéficiaire)',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/serve_Transfert'],
          },
          {
            label: 'Transfert Wallet',
            icon: 'pi pi-wallet',
            routerLink: ['/serve_Transfert_wallet'],
          },
          {
            label: 'Recherche Client',
            icon: 'pi pi-search-plus',
            routerLink: ['/effectuer_Transfert/espece/recherche_client'],
          },
          {
            label: 'Effectuer un transfert (client)',
            icon: 'pi pi-arrow-circle-up',
            routerLink: ['/effectuer_Transfert'],
          },
        ],
      },
      {
        label: 'Client',
        items: [
          {
            label: 'Ajouter Client',
            icon: 'pi pi-user-plus',
            routerLink: ['/add_client'],
          },
        ],
      },
    ];
    var path: any = window.location.href.split('/');

    this.initialElement = path[path.length - 1];

    this.isAuthenticated = this.authService.isLoggedIn();
    if (this.isAuthenticated) {
      // var id = +localStorage.getItem('id')!;
      // this.authService.getCurrentUser(id).subscribe((response) => {
      //   this.nom = response?.firstName + ' ' + response?.lastName;
      // });
      this.nom = 'hamza lemsaoui';
    }
  }

  ngAfterViewInit() {
    var menuElem: any = document.getElementsByClassName('nav_elem_name');
    for (let elem of menuElem) {
      if (this.initialElement == '') {
        if (elem.getAttribute('ng-reflect-router-link') == 'profile') {
          elem.click();
        }
      }
      if (elem.getAttribute('ng-reflect-router-link') == this.initialElement) {
        elem.click();
      }
    }
  }
}
