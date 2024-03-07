import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsComponent } from './components/details/details.component';
import { authGuard } from './shared/guards/auth.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrederComponent } from './components/oreder/oreder.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'',
    canActivate:[authGuard],
    component:BlankLayoutComponent,
    children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:'home'},
    {path:'cart',component:CartComponent,title:'cart'},
    {path:'payment/:id',component:PaymentComponent,title:'payment'},
    {path:'allorders',component:OrederComponent,title:'orders'},
    {path:'wishlist',component:WishlistComponent,title:'wish list'},
    {path:'products',component:ProductsComponent,title:'products'},
    {path:'details/:id',component:DetailsComponent,title:'details'},
    {path:'categories',component:CategoriesComponent,title:'categories'},
    {path:'brands',component:BrandsComponent,title:'brands'}
  ]
},

  {
    path:'',
    component:AuthLayoutComponent,
    children:[
    {path:'register',component:RegisterComponent,title:'register'},
    {path:'login',component:LoginComponent,title:'login'},
    {path:'forgetpassword',component:ForgetPasswordComponent,title:'forget-password'},
    {path:'verifycode',component:VerifyCodeComponent,title:'verify-code'},
    {path:'resetpaasword',component:ResetPasswordComponent,title:'reset-password'}
  ]
},
 
  {path:'**',component:NotfoundComponent,title:'notFound'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
