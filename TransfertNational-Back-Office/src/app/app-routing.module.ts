import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilComponent } from './demo/profil/profil.component';
import { LoginGuard } from './_core/guard/login.guard';
import { TransfertListComponent } from './demo/transfert-list/transfert-list.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './demo/notfound/notfound.component';
import { HomeComponent } from './demo/home/home.component';
import { AfficherInfoClientComponent } from './demo/afficher-info-client/afficher-info-client.component';
import { BlacklistComponent } from './demo/blacklist/blacklist.component';
import { ClientInfoComponent } from './demo/client-info/client-info.component';
import { ExtourneComponent } from './demo/extourne/extourne.component';
import { MakeTransfertComponent } from './demo/make-transfert/make-transfert.component';
import { AuthentificationComponent } from './demo/authentification/authentification.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', canActivate: [LoginGuard], component: HomeComponent },
      {
        path: 'profile',
        canActivate: [LoginGuard],
        component: ProfilComponent,
      },
      {
        path: 'blacklist',
        canActivate: [LoginGuard],
        component: BlacklistComponent,
      },
      {
        path: 'clients-list',
        canActivate: [LoginGuard],
        component: AfficherInfoClientComponent,
      },
      {
        path: 'clients-list/:cin',
        canActivate: [LoginGuard],
        component: ClientInfoComponent,
      },
      {
        path: 'transferts',
        canActivate: [LoginGuard],
        component: TransfertListComponent,
      },
      {
        path: 'extourne_transfert/:reference',
        canActivate: [LoginGuard],
        component: ExtourneComponent,
      },
      {
        path: 'emet-transferts',
        canActivate: [LoginGuard],
        component: MakeTransfertComponent,
      },
    ],
  },
  { path: 'auth/login', component: AuthentificationComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
