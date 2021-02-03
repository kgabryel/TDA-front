import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './pages/index/index.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {PinnedItemsComponent} from './components/pinned-items/pinned-items.component';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {NotesModule} from "../notes/notes.module";
import {BookmarksModule} from "../bookmarks/bookmarks.module";
import {TasksModule} from "../tasks/tasks.module";
import {EventParserService} from "../../core/services/event-parser/event-parser.service";
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import localeEn from '@angular/common/locales/en';
import {TranslateModule} from "@ngx-translate/core";

registerLocaleData(localePl);
registerLocaleData(localeEn);
@NgModule({
  declarations: [IndexComponent, CalendarComponent, PinnedItemsComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        MatExpansionModule,
        NotesModule,
        BookmarksModule,
        TasksModule,
        TranslateModule,
    ],
  providers: [
    EventParserService
  ]
})
export class DashboardModule {
}
