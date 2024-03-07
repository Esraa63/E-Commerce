import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/brand';
import { EcommercedataService } from 'src/app/shared/services/ecommercedata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
constructor(private _EcommercedataService:EcommercedataService){}
brands:Brand[]=[];
brand:Brand={} as Brand;
ngOnInit(): void {
    this._EcommercedataService.getAllBrands().subscribe({
      next:(response)=>{
        this.brands=response.data;
      }
    })
}

getSpesificBrand(id:string):void{
  this._EcommercedataService.getSpesificBrand(id).subscribe({
    next:(response)=>{
      this.brand=response.data;
      //console.log(this.brand);   
    }
  })
}
}
