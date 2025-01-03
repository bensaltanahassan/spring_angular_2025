import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { LoginGuard } from './_core/guard/login.guard';
import { ProfilComponent } from './pages/compte/profil/profil.component';
import { TransferByAccountDebitComponent } from './pages/transfer/transfer-by-account-debit/transfer-by-account-debit.component';
import { TransferByCashComponent } from './pages/transfer/transfer-by-cash/transfer-by-cash.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { SearchByCinComponent } from './pages/transfer/search-by-cin/search-by-cin.component';
import { KycTableComponent } from './pages/transfer/kyc-table/kyc-table.component';
import { SetSenderKycInfosComponent } from './pages/transfer/set-sender-kyc-infos/set-sender-kyc-infos.component';
import { ViewTransfersComponent } from './pages/view-transfers/view-transfers.component';
import { TransferInfosComponent } from './pages/view-transfers/transfer-infos/transfer-infos.component';
import { ExtourneComponent } from './pages/extourne/extourne.component';
import { ExtourneModalComponent } from './pages/extourne/extourne-modal/extourne-modal.component';
import { AddClientComponent } from './pages/client/add-client/add-client.component';
import { AddBeneficiaryDebitComponent } from './pages/newTransfert/add-beneficiary-debit/add-beneficiary-debit.component';
import { AddBeneficiaryComponent } from './pages/newTransfert/add-beneficiary/add-beneficiary.component';
import { BeneficiariesListDebitComponent } from './pages/newTransfert/beneficiaries-list-debit/beneficiaries-list-debit.component';
import { BeneficiariesListComponent } from './pages/newTransfert/beneficiaries-list/beneficiaries-list.component';
import { MainDebitComponent } from './pages/newTransfert/main-debit/main-debit.component';
import { MainComponent } from './pages/newTransfert/main/main.component';
import { OtpCheckComponent } from './pages/serve-transfer-by-wallet/otp-check/otp-check.component';
import { RecipientAccountSearchComponent } from './pages/serve-transfer-by-wallet/recipient-account-search/recipient-account-search.component';
import { ServeTransferByWalletComponent } from './pages/serve-transfer-by-wallet/serve-transfer-by-wallet.component';
import { PincodeCheckComponent } from './pages/serve-transfer/pincode-check/pincode-check.component';
import { RecipientSearchComponent } from './pages/serve-transfer/recipient-search/recipient-search.component';
import { ServeTransferComponent } from './pages/serve-transfer/serve-transfer.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { AppFooterComponent } from './layout/app.footer.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppMenuComponent } from './layout/app.menu.component';
import { AppMenuitemComponent } from './layout/app.menuitem.component';
import { AppSidebarComponent } from './layout/app.sidebar.component';
import { AppTopBarComponent } from './layout/app.topbar.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    ProfilComponent,
    TransferByAccountDebitComponent,
    TransferByCashComponent,
    TransferComponent,
    SearchByCinComponent,
    KycTableComponent,
    SetSenderKycInfosComponent,
    ViewTransfersComponent,
    TransferInfosComponent,
    ExtourneComponent,
    ExtourneModalComponent,
    ServeTransferComponent,
    RecipientSearchComponent,
    AddBeneficiaryComponent,
    BeneficiariesListComponent,
    MainComponent,
    PincodeCheckComponent,
    MainDebitComponent,
    ServeTransferByWalletComponent,
    OtpCheckComponent,
    RecipientAccountSearchComponent,
    AddClientComponent,
    AddBeneficiaryDebitComponent,
    BeneficiariesListDebitComponent,
    AppLayoutComponent,
    AppMenuComponent,
    AppTopBarComponent,
    AppMenuitemComponent,
    AppFooterComponent,
    AppSidebarComponent,
  ],

  imports: [
    NgxPaginationModule,
    InputTextareaModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    CheckboxModule,
    CommonModule,
    InputTextModule,
    SidebarModule,
    RippleModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    TieredMenuModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    ToastModule,
    DividerModule,
    TagModule,
  ],

  providers: [LoginGuard, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
