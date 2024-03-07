import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }
  header:any={token:localStorage.getItem('uToken')};

  addToWishlistService(id:string):Observable<any>{
    let bodyObject:any={"productId":id};   
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    bodyObject
    );
  }
  
  getWishlistServices():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`);
  }

  removeSpecificItme(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`);
  }
}
