import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit{

  constructor(private _AuthService:AuthService,private _CartService:CartService){}
  logOutUser(){
   this._AuthService.logOut();
  }
  
  cartItems:number=0;
  
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
            this.cartItems=data;
      }
    })

    this._CartService.getCartUser().subscribe({
      next:(response)=>{
        this.cartItems=response.numOfCartItems;
      }
    })
  }
}
