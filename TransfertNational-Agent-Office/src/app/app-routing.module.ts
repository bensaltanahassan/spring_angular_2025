import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './_core/guard/login.guard';
import { ProfilComponent } from './pages/compte/profil/profil.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { SearchByCinComponent } from './pages/transfer/search-by-cin/search-by-cin.component';
import { ViewTransfersComponent } from './pages/view-transfers/view-transfers.component';
import { ExtourneComponent } from './pages/extourne/extourne.component';
import { ServeTransferComponent } from './pages/serve-transfer/serve-transfer.component';
import { ServeTransferByWalletComponent } from './pages/serve-transfer-by-wallet/serve-transfer-by-wallet.component';
import { AddClientComponent } from './pages/client/add-client/add-client.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [LoginGuard],
        component: HomeComponent,
      },
      {
        path: 'profile',
        canActivate: [LoginGuard],
        component: ProfilComponent,
      },
      {
        path: 'effectuer_Transfert',
        canActivate: [LoginGuard],
        component: TransferComponent,
      },
      {
        path: 'effectuer_Transfert/espece/recherche_client',
        canActivate: [LoginGuard],
        component: SearchByCinComponent,
      },
      {
        path: 'list_Transfert',
        canActivate: [LoginGuard],
        component: ViewTransfersComponent,
      },
      {
        path: 'infos_Transfert/:reference',
        canActivate: [LoginGuard],
        component: ExtourneComponent,
      },
      {
        path: 'serve_Transfert',
        canActivate: [LoginGuard],
        component: ServeTransferComponent,
      },
      {
        path: 'serve_Transfert_wallet',
        canActivate: [LoginGuard],
        component: ServeTransferByWalletComponent,
      },
      {
        path: 'add_client',
        canActivate: [LoginGuard],
        component: AddClientComponent,
      },
    ],
  },
  { path: 'auth/login', component: AuthentificationComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
