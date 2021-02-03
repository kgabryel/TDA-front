import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoutingConfig} from "../../config/routing.config";
import {IndexComponent} from "./pages/index/index.component";
import {CreateComponent} from "./pages/create/create.component";
import {ToDoComponent} from "./pages/to-do/to-do.component";


const routes: Routes = [
  {path: RoutingConfig.home, component: IndexComponent},
  {path: RoutingConfig.create, component: CreateComponent},
  {path: RoutingConfig.toDo, component: ToDoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
