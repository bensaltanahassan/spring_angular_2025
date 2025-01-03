import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  private token : any
  private id : any
    
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let modifiedReq:any;
      modifiedReq = req.clone({
        headers: req.headers.set('Access-Control-Allow-Origin', '*')
      });
      
      if (localStorage.getItem("token")!=null)
      {
        this.token = localStorage.getItem("token");
        this.id = localStorage.getItem("id");
        modifiedReq = req.clone({ 
          // headers: req.headers.set('Authorization', `Bearer ${this.token}`)
                              // .set('id',this.id),
        });
        return next.handle(modifiedReq);
      }
      return next.handle(req);
    }
  
  
}
