import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../Models/agent';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientDataService {
  Baseurl: string = environment.API_BASE_URL;

  constructor(private _http: HttpClient) {}

  
  getAll(): Observable<Client[]> {
    return this._http.get<Client[]>(this.Baseurl + 'clients');
  }

  getClientByCin(cin: any): Observable<any> {
    return this._http.get<any>(this.Baseurl + 'client/cin/' + cin);
  }

  addToBlackList(id: any): Observable<any> {
    return this._http.post(this.Baseurl + '/blacklist', { id });
  }

  checkIfBlackList(id: any): Observable<any> {
    return this._http.post(this.Baseurl + '/blacklist', { id });
  }
}
