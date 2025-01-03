import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, private router: Router) {}

  ngOnInit(): void {
    this.items = [
      // {
      //     label: `${this.storeService.get_DataSession(
      //         'name'
      //     )} (${this.storeService.get_DataSession('role')})`,
      //     icon: 'pi pi-user',
      // },
      // {
      //     separator: true,
      // },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: (event) => {
          this.logout();
        },
      },
    ];
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']).then(() => {
      window.location.reload();
    });
  }
}
