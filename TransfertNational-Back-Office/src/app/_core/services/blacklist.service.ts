import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlackList } from '../Models/BlackList';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlacklistService {
  blackList: BlackList[] = [];

  // Baseurl : string = "https://ensa-api-transfer.herokuapp.com/api_backoffice/";
  Baseurl: string = environment.API_BASE_URL;
  constructor(private _http: HttpClient) {}

  bloquer(user: any): Observable<any> {
    return this._http.post<any>(this.Baseurl + 'blacklist', user);
  }

  debloquer(id: any): Observable<any> {
    return this._http.get<any>(this.Baseurl + 'blacklist/client/delete/' + id);
  }

  checkIfClientBlocked(objet: any) {
    return this._http.post<any>(this.Baseurl + 'blacklist/client', objet);
  }
  getAll(){
    return this._http.get<any>(this.Baseurl + 'blacklist');
  }
  getBlackListByPhoneNumber(ph: any) {
    return this._http.get<any>(this.Baseurl + 'blacklist/client/' + ph);
  }

  getBlackListByPage(currentpage: any) {
    return this._http.get<any>(this.Baseurl + 'blacklist?page=' + currentpage);
  }

  public getBlackList_Count() {
    return this._http.get(this.Baseurl + 'blacklist/count');
  }
}
