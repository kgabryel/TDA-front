import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {RoutingConfig} from "../../config/routing.config";


const routes: Routes = [
  {
    path: RoutingConfig.home, component: MainComponent, children: [
      {
        path: RoutingConfig.home,
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: RoutingConfig.alarms,
        loadChildren: () => import('../alarms/alarms.module').then(m => m.AlarmsModule)
      },
      {
        path: RoutingConfig.tasks,
        loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path: RoutingConfig.notes,
        loadChildren: () => import('../notes/notes.module').then(m => m.NotesModule)
      },
      {
        path: RoutingConfig.bookmarks,
        loadChildren: () => import('../bookmarks/bookmarks.module').then(m => m.BookmarksModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
