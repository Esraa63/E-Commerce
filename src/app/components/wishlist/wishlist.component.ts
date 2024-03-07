import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
constructor(private _WishlistService:WishlistService,private toastr: ToastrService,private _CartService:CartService){}
wishlistDetails:any[]=[];
listData:string[]=[];
ngOnInit(): void {
  this._WishlistService.getWishlistServices().subscribe({
    next:(response)=>{
          console.log(response.data);
           this.wishlistDetails=response.data;       
          }
  })
}

removeItem(id:string):void{
  this._WishlistService.removeSpecificItme(id).subscribe({
    next:(response)=>{
        //  console.log(response.data);   
          this.listData=response.data; 
           this.toastr.success(response.message);     
           this._WishlistService.getWishlistServices().subscribe({
            next:(response)=>{
                   this.wishlistDetails=response.data;       
                  }
          })     
          }
  })
}


//product
addToCart(id:string):void{
  this._CartService.addToCartService(id).subscribe({
    next:(response)=>{
      console.log(response);   
      this.listData=response;
      this.toastr.success(response.message,'Fresh Cart');
      this._CartService.cartNumber.next(response.numOfCartItems);
    },
    error:(err:HttpErrorResponse)=>{
      console.log(err.error);
    }
  })
 }

}
