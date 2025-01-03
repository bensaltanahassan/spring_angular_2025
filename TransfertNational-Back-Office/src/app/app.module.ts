import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilComponent } from './demo/profil/profil.component';
import { LoginGuard } from './_core/guard/login.guard';
import { RequestsInterceptor } from './_core/Interceptor/requests.interceptor';
import { TransfertListComponent } from './demo/transfert-list/transfert-list.component';
import { CommonModule } from '@angular/common';

//primeng
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TagModule } from 'primeng/tag';
import { AppTopBarComponent } from './layout/app.topbar.component';
import { AppMenuitemComponent } from './layout/app.menuitem.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppFooterComponent } from './layout/app.footer.component';
import { AppMenuComponent } from './layout/app.menu.component';
import { AppSidebarComponent } from './layout/app.sidebar.component';
import { NotfoundComponent } from './demo/notfound/notfound.component';
import { HomeComponent } from './demo/home/home.component';
import { AuthentificationComponent } from './demo/authentification/authentification.component';
import { TransfertInfoComponent } from './demo/transfert-info/transfert-info.component';
import { ClientInfoComponent } from './demo/client-info/client-info.component';
import { ChangeStatComponent } from './demo/change-stat/change-stat.component';
import { BlacklistComponent } from './demo/blacklist/blacklist.component';
import { MakeTransfertComponent } from './demo/make-transfert/make-transfert.component';
import { KycTableComponent } from './demo/make-transfert/kyc-table/kyc-table.component';
import { SearchByCinComponent } from './demo/make-transfert/search-by-cin/search-by-cin.component';
import { SetSenderKycInfosComponent } from './demo/make-transfert/set-sender-kyc-infos/set-sender-kyc-infos.component';
import { TransferByAccountDebitComponent } from './demo/make-transfert/transfer-by-account-debit/transfer-by-account-debit.component';
import { TransferByCashComponent } from './demo/make-transfert/transfer-by-cash/transfer-by-cash.component';
import { ViewTransfersComponent } from './demo/view-transfers/view-transfers.component';
import { TransferInfosComponent } from './demo/view-transfers/transfer-infos/transfer-infos.component';
import { AfficherInfoClientComponent } from './demo/afficher-info-client/afficher-info-client.component';
import { MainComponent } from './demo/make-transfert/transfert-form/main/main.component';
import { BeneficiariesListComponent } from './demo/make-transfert/transfert-form/beneficiaries-list/beneficiaries-list.component';
import { AddBeneficiaryComponent } from './demo/make-transfert/transfert-form/add-beneficiary/add-beneficiary.component';
import { ExtourneComponent } from './demo/extourne/extourne.component';
import { ExtourneModalComponent } from './demo/extourne/extourne-modal/extourne-modal.component';
import { BloquerModalComponent } from './demo/extourne/bloquer-modal/bloquer-modal.component';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    NotfoundComponent,
    AppLayoutComponent,
    AppMenuComponent,
    AppComponent,
    AppTopBarComponent,
    AppMenuitemComponent,
    AppFooterComponent,
    AppSidebarComponent,
    HomeComponent,
    AuthentificationComponent,
    ProfilComponent,
    TransfertInfoComponent,
    TransfertListComponent,
    ClientInfoComponent,
    ChangeStatComponent,
    BlacklistComponent,
    MakeTransfertComponent,
    KycTableComponent,
    SearchByCinComponent,
    SetSenderKycInfosComponent,
    TransferByAccountDebitComponent,
    TransferByCashComponent,
    ViewTransfersComponent,
    TransferInfosComponent,
    AfficherInfoClientComponent,
    MainComponent,
    AddBeneficiaryComponent,
    BeneficiariesListComponent,
    ExtourneComponent,
    ExtourneModalComponent,
    BloquerModalComponent,
  ],

  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    CheckboxModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    RippleModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    TieredMenuModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    TagModule,
  ],
  providers: [
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
