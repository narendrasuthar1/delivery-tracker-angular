import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddOrderComponent } from './add-order/add-order.component';

const routes: Routes = [
  { path: '', component:LandingComponent},
  { path: 'login', component:LoginComponent},
  { path: 'home', component:HomepageComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
