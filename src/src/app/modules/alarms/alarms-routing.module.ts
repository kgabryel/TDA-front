import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoutingConfig} from "../../config/routing.config";
import {CreateComponent} from "./pages/create/create.component";
import {IndexComponent} from "./pages/index/index.component";


const routes: Routes = [
  {path: RoutingConfig.home, component: IndexComponent},
  {path: RoutingConfig.create, component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmsRoutingModule {
}
