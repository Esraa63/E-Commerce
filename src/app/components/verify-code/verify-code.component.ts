import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {
  constructor(private _AuthService:AuthService,private _FormBuilder:FormBuilder,private _Router:Router){}
  resetCode:FormGroup = this._FormBuilder.group({
    resetCode:['',[Validators.required]]
   })
   msg:string='';
   checkCode():void{
    if(this.resetCode.valid){
      this._AuthService.verify(this.resetCode.value).subscribe({
        next:(response)=>{
          console.log(response);
          this.msg=response.message;
          this._Router.navigate(['/resetpaasword']);
        },error:(err:HttpErrorResponse)=>{
          this.msg=err.error.message;
        }
       })
    }
   }
}
