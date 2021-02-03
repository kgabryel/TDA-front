import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoutingConfig} from "./config/routing.config";
import {LoginComponent} from "./modules/auth/pages/login/login.component";
import {AuthGuard} from "./core/guards/auth/auth.guard";
import {RegisterComponent} from "./modules/auth/pages/register/register.component";
import {GuestGuard} from "./core/guards/guest/guest.guard";

const routes: Routes = [
  {path: RoutingConfig.login, component: LoginComponent, canActivate: [GuestGuard]},
  {path: RoutingConfig.registration, component: RegisterComponent, canActivate: [GuestGuard]},
  {
    path: RoutingConfig.home,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
