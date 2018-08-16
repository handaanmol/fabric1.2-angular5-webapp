import { Injectable } from '@angular/core';
import { HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class TokenInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = req.url.split('/').splice(-1)[0];
    console.log('req', auth, req);
    if (auth !== 'users') {
      console.log("---------------------------")
      req = req.clone({
        setHeaders: {
          'Authorization': sessionStorage.getItem('Authorization'),
          'Content-Type': 'application/json'
        }
        
      });
    }

    return next.handle(req)
      .do((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
        }
      }).catch(error => {
        console.log('error', error);
        return Observable.throw(error);
      });
  }
}
