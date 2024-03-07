import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 constructor(private _AuthService:AuthService,private _FormBuilder:FormBuilder,private _Router:Router){}
 msg:string=''
 isLoading:boolean=false;
 
 registerForm:FormGroup = this._FormBuilder.group({
  name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
  rePassword:['',[Validators.required]],
  phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
 },
 {
  validators:[this.confirmPassword]
 })

checkForm():void{
  if(this.registerForm.valid){
    this.isLoading=true;
    this._AuthService.addUser(this.registerForm.value).subscribe({
      next:(response)=>{
        if(response.message="success"){
          this.isLoading=false;
          this._Router.navigate(['/login']);
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.isLoading=false;
        this.msg=err.error.message;
        console.log(err.error.message);    
      }

    }
      );
  }
 
  // else{
  //   this.registerForm.markAllAsTouched();
  // }

 }

 confirmPassword(group:FormGroup):void{
  const password=group.get('password');
  let rePassword=group.get('rePassword');
  if(password?.value!=rePassword?.value){
    rePassword?.setErrors({notEqual:true})
  }

 }

}
