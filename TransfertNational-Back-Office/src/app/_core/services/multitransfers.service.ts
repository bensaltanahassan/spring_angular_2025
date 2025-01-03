import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MultitransfersService {
  constructor(private _http: HttpClient) {}

  baseUrl: string = environment.API_BASE_URL;

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

  public GetMultitransfers() {
    return this._http.get(this.baseUrl + 'Multitransfers?page=1');
  }

  
  public setTransfer(transfer: any) {
    return this._http.post(this.baseUrl + 'createTransfer', transfer);
  }

  public GetMultitransfer_byreference(reference: any) {
    return this._http.get(this.baseUrl + 'UniqueTransfer/' + reference);
  }

  public BloqueTransfer_byreference(reference: any, motif: string) {
    return this._http.put(
      this.baseUrl + 'UniqueTransfer/bloque/' + reference + '?motif=' + motif,
      {}
    );
  }

  public DebloqueTransfer_byreference(reference: any, motif: string) {
    return this._http.put(
      this.baseUrl + 'UniqueTransfer/unlock/' + reference + '?motif=' + motif,
      {}
    );
  }

  public ExtortTransfer_byreference(reference: any, motif: string) {
    return this._http.put(
      this.baseUrl + 'UniqueTransfer/extort/' + reference + '?motif=' + motif,
      {}
    );
  }
}
