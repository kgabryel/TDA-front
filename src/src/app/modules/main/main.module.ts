import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './components/main/main.component';
import {MainRoutingModule} from "./main-routing.module";
import {SidenavService} from "../../core/services/sidenav/sidenav.service";
import {LayoutConfig} from "../../config/layout.config";
import {MenuModule} from "../menu/menu.module";
import {HeaderModule} from "../header/header.module";
import {CookieService} from "ngx-cookie-service";
import {NotificationService} from "../../core/services/notification/notification.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TasksService} from "../../core/services/tasks/tasks.service";
import {StoreModule} from "@ngrx/store";
import {key, reducer} from "../../store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {AlarmsEffects} from "../../store/effects/alarmsEffects";
import {TasksEffects} from "../../store/effects/tasksEffects";
import {TokenInterceptor} from "../../core/interceptors/token/token.interceptor";
import {AlarmsService} from "../../core/services/alarms/alarms.service";
import {NotificationTypesEffects} from "../../store/effects/notificationTypesEffects";
import {NotificationTypesService} from "../../core/services/notification-types/notification-types.service";


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MenuModule,
    HeaderModule,
    MatSnackBarModule,
    StoreModule.forFeature(key, reducer),
    EffectsModule.forFeature([AlarmsEffects, TasksEffects, NotificationTypesEffects]),
    HttpClientModule
  ],
  providers: [
    {provide: LayoutConfig.menuServiceName, useClass: SidenavService},
    CookieService,
    SidenavService,
    NotificationService,
    NotificationTypesService,
    TasksService,
    AlarmsService,
    HttpClient,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ]
})
export class MainModule {
}
