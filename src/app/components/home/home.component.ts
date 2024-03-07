import {Product } from './../../shared/interfaces/product';
import { Category } from './../../shared/interfaces/category';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcommercedataService } from 'src/app/shared/services/ecommercedata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private _EcommercedataService:EcommercedataService,private _CartService:CartService){}
  categoriesSlider: OwlOptions = {
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
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  mainSlider: OwlOptions = {
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
  products:Product[]=[];
  categories:Category[]=[];
  serachTerm:string='';
    ngOnInit(): void {
    //Categories
    this._EcommercedataService.getAllCategory().subscribe({
      next:(respose)=>{
        //  console.log(respose.data);
         this.categories=respose.data; 
      },
      error:(err:HttpErrorResponse)=>{
      } 
    });



     //products
     this._EcommercedataService.getAllProdcuts().subscribe({
      next:(respose)=>{
        //  console.log(respose.data);
         this.products=respose.data; 
      },
      error:(err:HttpErrorResponse)=>{

      } 
    });
}

}

