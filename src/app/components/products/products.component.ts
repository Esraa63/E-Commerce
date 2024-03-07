import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcommercedataService } from 'src/app/shared/services/ecommercedata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private _EcommercedataService:EcommercedataService,
    private _CartService:CartService,
    private toastr: ToastrService
    ,private _WishlistService:WishlistService){}
  products:Product[]=[];
  wishlistData:string[]=[];
  serachTerm:string='';
     ngOnInit(): void {
     //products
     this._EcommercedataService.getAllProdcuts().subscribe({
      next:(respose)=>{
        //  console.log(respose.data);
         this.products=respose.data; 
      },
      error:(err:HttpErrorResponse)=>{  
      } 
    });
    //wishList
    this._WishlistService.getWishlistServices().subscribe({
      next:(response)=>{
        const newData=response.data.map((item:any)=>item._id);
        this.wishlistData=newData;

      }
    });
}

addToCart(id:string):void{
  this._CartService.addToCartService(id).subscribe({
    next:(response)=>{
      console.log(response);   
      this.toastr.success(response.message,'Fresh Cart');
      this._CartService.cartNumber.next(response.numOfCartItems);
    },
    error:(err:HttpErrorResponse)=>{
      console.log(err.error);
    }
  })
 }


  //wishlist
  addToWishlist(id:string):void{
    this._WishlistService.addToWishlistService(id).subscribe({
      next:(response)=>{
            // console.log(response.data);
             this.wishlistData=response.data;
             console.log(this.wishlistData)
             this.toastr.success(response.message);
             if(response.status=="success"){
             // this.flage=true;       
             }
               
      },error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })
  }

}

