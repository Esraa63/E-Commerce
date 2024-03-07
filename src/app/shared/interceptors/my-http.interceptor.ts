import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('uToken')!=null){
      let myHeader:any= {token:localStorage.getItem('uToken')}
      request= request.clone({
        setHeaders:myHeader  
      });
    }
  
    return next.handle(request);
  }
}
