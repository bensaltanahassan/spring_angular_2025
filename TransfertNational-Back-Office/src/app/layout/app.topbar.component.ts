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
    isLight:boolean=false;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
    ) {
        this.isLight=this.layoutService.config().colorScheme === 'light' ? true : false;
    }

    ngOnInit(): void {
        this.isLight=this.layoutService.config().colorScheme === 'light' ? true : false;
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
    changeTheme(theme: string, colorScheme: string) {
        this.isLight=!this.isLight;
        // this.isLight=this.layoutService.config().colorScheme === colorScheme ? false : true;
        this.layoutService.config.update((config) => ({ ...config, theme:theme,colorScheme:colorScheme }));

    }
    logout() {
        localStorage.clear();
            this.router.navigate(['/auth/login']).then(() => {
                    window.location.reload();
                });
    }
}
