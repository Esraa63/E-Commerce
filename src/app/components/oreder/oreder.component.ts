import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EcommercedataService } from 'src/app/shared/services/ecommercedata.service';

@Component({
  selector: 'app-oreder',
  templateUrl: './oreder.component.html',
  styleUrls: ['./oreder.component.css']
})
export class OrederComponent implements OnInit{
  constructor(private _EcommercedataService:EcommercedataService){}
  userData:any;
  data:any;
ngOnInit(): void {
  if(localStorage.getItem('uToken')!=null){
    let encodeuser:any=localStorage.getItem('uToken');
     this.userData =jwtDecode(encodeuser);
     console.log(this.userData.id);
     this._EcommercedataService.getUserOreders(this.userData.id).subscribe({
      next:(response)=>{
        this.data=response;
        console.log(this.data);
      },error:(err:HttpErrorResponse)=>{
         console.log(err.error); 
      }
     })

    }
}

}
