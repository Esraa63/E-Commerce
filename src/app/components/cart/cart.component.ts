import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private _CartService:CartService,private toastr: ToastrService,private _Router:Router){}
  cartDetails:any={};
  lenProduct:number=0;
ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next:(response)=>{ 
        console.log(response.data);  
        this.cartDetails=response.data;
        this.lenProduct= Object.keys(this.cartDetails.products).length
       // console.log("lenth  "+this.lenProduct);
        
      }, error:(err)=>{
        console.log(err);   
      }
    });
  
}

removeItem(id:string): void {
  this._CartService.removeSpecificItem(id).subscribe({
    next:(response)=>{
      this.cartDetails=response.data;   
      this.lenProduct= Object.keys(this.cartDetails.products).length
      this.toastr.success("Item Deleted Success");    
      this._CartService.cartNumber.next(response.numOfCartItems);
    }
  })
}

updateItem(id:string,count:number): void {
  if(count>0){
    this._CartService.updateSpecificItem(id,count).subscribe({
      next:(response)=>{
        this.cartDetails=response.data;   
        this._CartService.cartNumber.subscribe
      }
    })
  }
}

removeAll():void{
  this._CartService.removeAllCart().subscribe({
    next:(response)=>{  
      if(response.message=='success'){
        this.toastr.success("Cart Deleted"); 
        // this.cartDetails=response.data;
        this.cartDetails={};
        this.lenProduct= 0;
        this._CartService.cartNumber.next(response.numOfCartItems);
      }
     
    }
  })
}

}
