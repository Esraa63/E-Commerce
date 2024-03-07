import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private _AuthService:AuthService,private _FormBuilder:FormBuilder,private _Router:Router){}
  resetPassword:FormGroup = this._FormBuilder.group({
    email:['',[Validators.required,Validators.email]],
    newPassword:['',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]]
   })
   msg:string='';

   checkForm():void{
    if(this.resetPassword.valid){
      this._AuthService.resetPassword(this.resetPassword.value).subscribe({
        next:(response)=>{
          console.log(response);
          this.msg=response.message;
          if(response.token){
            localStorage.setItem('uToken',response.token); 
            this._Router.navigate(['/home']);
          }
        },error:(err:HttpErrorResponse)=>{
          this.msg=err.error.message;
        }
       })
    }
   }
}
