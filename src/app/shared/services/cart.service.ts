import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WishlistService } from './wishlist.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  constructor(private _HttpClient:HttpClient) { }
  
  cartNumber:BehaviorSubject<number>= new BehaviorSubject(0);
  

  addToCartService(id:string):Observable<any>{
    let bodyObject:any={productId:id};
    
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/cart`,
    bodyObject
    );
  }

  getCartUser():Observable<any>{
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`);
  }

  updateSpecificItem(id:string,countItem:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      count:countItem
    });
  }

  removeSpecificItem(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`);
  }
  
  removeAllCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`);
  }

  checkOut(id:string,userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://github.com/Esraa63/E-Commerce.git`,
    {
      shippingAddress:userData
    }
    );
  }
}
