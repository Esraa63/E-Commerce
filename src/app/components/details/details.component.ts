import { Product } from './../../shared/interfaces/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcommercedataService } from 'src/app/shared/services/ecommercedata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute,
  private _EcommercedataService:EcommercedataService,
  private _HttpClient:HttpClient,
  private _CartService:CartService,
  private toastr: ToastrService,
  private _WishlistService:WishlistService){}
productDetailsSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    }
  },
  nav: true
}
productDetails:Product={} as Product;
cartItems:number=0;
wishlistData:string[]=[];
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      {
        next:(params)=>{
           let idProdcut:any= params.get('id')
           this._EcommercedataService.getDetailsOfProduct(idProdcut).subscribe({
            next:(response)=>{
              console.log(response.data);   
              this.productDetails=response.data;     
            }
           });
        }
      }
    )

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
