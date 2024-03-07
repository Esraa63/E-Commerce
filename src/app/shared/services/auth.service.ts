import { User } from 'src/app/shared/interfaces/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _Router:Router) { }
  logOut():void{
    localStorage.removeItem('uToken');
    this._Router.navigate(['/login']);
   }

  addUser(user:User):Observable<any>{
   return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,user);
  }
  
  getUser(user:User):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,user);
  }

  forgetPassword(email:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
       email
    );
  }
   
  verify(resetCode:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
    resetCode
     );
  }

  resetPassword(userData:object):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      userData
    );
  }
  
}
