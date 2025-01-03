import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class MultitransfersService {
  constructor(private _http: HttpClient, private auth: AuthenticationService) {}

  baseUrl: string = 'http://localhost:8081/api/agent/';

  multitransfer: any = [];

  add(transfer: any) {
    this.multitransfer.push(transfer);
    return true;
  }

  supprimer(transfer: any) {
    this.multitransfer = this.multitransfer.filter((element: any) => {
      return element != transfer;
    });
  }

  public GetMultitransfer_byAgent(page: any) {
    var id = +localStorage.getItem('id')!;
    return this._http.get(`${this.baseUrl}Multitransfer/${id}?page=${page}`);
  }

  public countMultitransfer_byAgent() {
    let id = this.auth.getUserId();
    return this._http.get(`${this.baseUrl}Multitransfer/${id}/count`);
  }

  public setTransfer_byCash(transfer: any) {
    let id = this.auth.getUserId();
    return this._http.post(
      this.baseUrl + `createTransfer/byCash/${id}`,
      transfer
    );
  }

  public setTransfer(transfer: any) {
    let id = this.auth.getUserId();
    return this._http.post(this.baseUrl + `createTransfer/${id}`, transfer);
  }

  public GetMultitransfer_byreference(reference: any) {
    let id = this.auth.getUserId();
    return this._http.get(this.baseUrl + `UniqueTransfer/${reference}`);
  }

  public GetWalletMultitransfer_byreference(reference: any) {
    return this._http.get(this.baseUrl + 'UniqueTransfer/wallet/' + reference);
  }

  public ServeTransfer_byreference(reference: any) {
    let id = this.auth.getUserId();
    return this._http.put(
      this.baseUrl + `UniqueTransfer/serve/${reference}/${id}`,
      {}
    );
  }

  public ServeWalletTransfer_byreference(reference: any) {
    let id = this.auth.getUserId();
    return this._http.put(
      this.baseUrl + `UniqueTransfer/wallet/serve/${reference}/${id}`,
      {}
    );
  }

  public checkRecipient_byreference(reference: any, infos: any) {
    let id = this.auth.getUserId();
    return this._http.post(
      this.baseUrl + `UniqueTransfer/serve/${reference}/${id}`,
      infos
    );
  }

  public checkTransfer_code_pin(reference: any, pin_code: any) {
    return this._http.get(
      this.baseUrl + `UniqueTransfer/pin_code/${reference}?code_pin=${pin_code}`
    );
  }

  public ExtortTransfer_byreference(reference: any, motif: string) {
    let id = this.auth.getUserId();
    return this._http.put(
      this.baseUrl + `UniqueTransfer/extort/${reference}/${id}?motif=${motif}`,
      {}
    );
  }

  public checkIfClientBlocked(object: any) {
    return this._http.post(this.baseUrl + 'blacklist/client', object);
  }
}
