import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [{ path: "login", component: LoginComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirection par défaut vers /home
{ path: 'home', component: HomeComponent }, 
{ path: 'signup', component: SignupComponent },
{ path: 'order', component: TrackOrderComponent },
{ path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) }, 
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
