import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private _AuthService:AuthService,private _FormBuilder:FormBuilder,private _Router:Router){}
  msg:string='';
  forgetForm:FormGroup = this._FormBuilder.group({
    email:['',[Validators.required,Validators.email]]
   })
  
   checkEmail():void{
    if(this.forgetForm.valid){
      //console.log(this.forgetForm.value); 
       this._AuthService.forgetPassword(this.forgetForm.value).subscribe({
        next:(response)=>{
         // console.log(this.forgetForm.get("email")?.value);  
          this.msg=response.message;
          console.log(response);
          this._Router.navigate(['/verifycode']);
        },error:(err:HttpErrorResponse)=>{
          this.msg=err.error.message;
        }
       })
      
    }
   }
}
