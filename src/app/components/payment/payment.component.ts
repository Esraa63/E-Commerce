import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  msg:string=''
  cartId:any= '';
  constructor(private _FormBuilder:FormBuilder ,private _Router:Router,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService){}
    paymentForm:FormGroup = this._FormBuilder.group({
    details:['',[Validators.required]],
    phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:['',[Validators.required]]
   })
  
  
   ngOnInit(): void {
       this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
           this.cartId= params.get('id')
        }
       })
       
   }

   checkForm():void{
    if(this.paymentForm.valid){
     // console.log(this.paymentForm);
      
      this._CartService.checkOut(this.cartId,this.paymentForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          
          if(response.status="success"){
          //  console.log('sucess'); 
            window.open(response.session.url,'_self');
          }
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err.error.message);    
        }
  
      }
        );
    }
   
    // else{
    //   this.paymentForm.markAllAsTouched();
    // }
  
   }
}
