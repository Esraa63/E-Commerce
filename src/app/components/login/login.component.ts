import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _FormBuilder:FormBuilder,private _Router:Router){}
  msg:string=''
  isLoading:boolean=false;
  
  loginForm:FormGroup = this._FormBuilder.group({
   email:['',[Validators.required,Validators.email]],
   password:['',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]]
  })
 
  checkUser():void{
   if(this.loginForm.valid){
    this.isLoading=true;
     this._AuthService.getUser(this.loginForm.value).subscribe({
      next:(response)=>{
        this.isLoading=false;
        this._Router.navigate(['/home']);
        localStorage.setItem('uToken',response.token)
      },
      error:(err:HttpErrorResponse)=>{
        this.isLoading=false;
        this.msg=err.error.message;
        // console.log("message "+err.error.message);   
      }
     })
   }
  //  else{
  //   this.loginForm.markAllAsTouched();
  //  }

  }
}
