import { Category, Subcategory } from './../../shared/interfaces/category';
import { Component, OnInit } from '@angular/core';
import { EcommercedataService } from 'src/app/shared/services/ecommercedata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  constructor(private _EcommercedataService:EcommercedataService){}
  categories:Category[]=[];
  specific:Category={} as Category;
  subCategories:Subcategory[]=[];
 ngOnInit(): void {
     this._EcommercedataService.getAllCategory().subscribe({
      next:(response)=>{
           //console.log(response.data);
           this.categories=response.data;
      }
     })
 }
 getSubCategory(id:string):void{
  this._EcommercedataService.getSubCategories(id).subscribe({
    next:(response)=>{
         console.log(response.data);
         this.subCategories=response.data;
    }
   })
 }
 getSpecificCategory(id:string):void{
  this._EcommercedataService.getSpesificCategory(id).subscribe({
    next:(response)=>{
         console.log(response.data);
         this.specific=response.data;
    }
   })
 }
}
