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
            label: 'Liste des clients',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/clients-list'],
          },
          {
            label: 'Blacklist',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/blacklist'],
          },
          {
            label: 'La liste de transferts',
            icon: 'pi pi-sort-alt',
            routerLink: ['/transferts'],
          },
        ],
      },
    ];
    var path: any = window.location.href.split('/');

    this.initialElement = path[path.length - 1];

    this.isAuthenticated = this.authService.isLoggedIn();
  
    if (this.isAuthenticated) {
      this.authService.getCurrentUser(this.authService.getId()).subscribe((response) => {
        this.nom = response?.firstName + ' ' + response?.lastName;
      });
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
