import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  baseUrl: string = 'http://localhost:8081/api/agent/';

  constructor(private _http: HttpClient) {}

  updatepwd(infos: any) {
    return this._http.post(this.baseUrl + 'updateMDP', infos);
  }

  createClient(infos: any) {
    return this._http.post(this.baseUrl + 'client', infos);
  }

  getClient_byCIN(cin: any) {
    return this._http.get(this.baseUrl + 'client/cin/' + cin);
  }

  getClient_byPH(ph: any) {
    return this._http.get(this.baseUrl + 'client/ph/' + ph);
  }

  getClient_byAccount(account: any) {
    return this._http.get(this.baseUrl + 'client/account/get/' + account);
  }

  getClient_recipients(id_client: any) {
    return this._http.get(this.baseUrl + 'client/recipients/' + id_client);
  }

  checkAccount_solde(id_client: any, amount: any) {
    return this._http.get(
      this.baseUrl + 'client/account/' + id_client + '?amount=' + amount
    );
  }

  checkRecipient_infos(infos: any) {
    return this._http.get(
      this.baseUrl +
        'client/recipient?lname=' +
        infos.receiver_lname +
        '&phnumber=' +
        infos.receiver_phnumber
    );
  }

  sendOtpToClient(otp: any, phn: any) {
    return this._http.post(
      this.baseUrl +
        'MultiTransfer/client/otp?otp=' +
        otp +
        '&phone_number=' +
        phn,
      {}
    );
  }
}
