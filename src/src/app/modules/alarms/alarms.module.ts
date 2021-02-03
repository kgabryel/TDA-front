import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './pages/index/index.component';
import {CreateComponent} from './pages/create/create.component';
import {AlarmsRoutingModule} from "./alarms-routing.module";
import {FormComponent as SingleFormComponent} from './components/single-form/form/form.component';
import {FormComponent as PeriodicFormComponent} from './components/periodic-form/form/form.component';
import {MatTabsModule} from "@angular/material/tabs";
import {SmallFormComponent as PeriodicSmallFormComponent} from './components/periodic-form/small-form/small-form.component';
import {BigFormComponent as PeriodicBigFormComponent} from './components/periodic-form/big-form/big-form.component';
import {SmallFormComponent as SingleSmallFormComponent} from './components/single-form/small-form/small-form.component';
import {BigFormComponent as SingleBigFormComponent} from './components/single-form/big-form/big-form.component';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {MatStepperModule} from "@angular/material/stepper";
import {TypePartComponent} from './components/parts/type-part/type-part.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NotificationPartComponent as SingleNotificationPartComponent} from "./components/single-form/parts/notification-part/notification-part.component";
import {FormNotificationService} from "../../core/services/form-notification/form-notification.service";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {PeriodicFormFactory, SingleFormFactory} from "../../core/factories/alarm.factory";
import {NotificationTypesService} from "../../core/services/notification-types/notification-types.service";
import {AlarmsService} from "../../core/services/alarms/alarms.service";
import {NotificationPartComponent as PeriodicNotificationPartComponent} from './components/periodic-form/parts/notification-part/notification-part.component';
import {MatSelectModule} from "@angular/material/select";
import {AlarmSingleComponent} from './components/alarm-single/alarm-single.component';
import {AlarmPeriodicComponent} from './components/alarm-periodic/alarm-periodic.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ContentPartComponent} from './components/periodic-form/parts/content-part/content-part.component';
import {MainPartComponent as PeriodicMainPartComponent} from './components/periodic-form/parts/main-part/main-part.component';
import {MainPartComponent as SingleMainPartComponent} from './components/single-form/parts/main-part/main-part.component';
import {SharedModule} from "../shared/shared.module";
import {ScrollingModule} from "@angular/cdk/scrolling";
import { FormComponent } from './components/form/form.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {TranslateModule} from "@ngx-translate/core";
import {AlarmValidator} from "../../core/validators/alarms/alarm.validator";

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    SingleFormComponent,
    PeriodicFormComponent,
    PeriodicSmallFormComponent,
    PeriodicBigFormComponent,
    SingleSmallFormComponent,
    SingleBigFormComponent,
    TypePartComponent,
    SingleNotificationPartComponent,
    PeriodicNotificationPartComponent,
    AlarmSingleComponent,
    AlarmPeriodicComponent,
    ContentPartComponent,
    PeriodicMainPartComponent,
    SingleMainPartComponent,
    FormComponent
  ],
    imports: [
        CommonModule,
        AlarmsRoutingModule,
        MatTabsModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        AngularEditorModule,
        MatStepperModule,
        MatChipsModule,
        MatAutocompleteModule,
        DragDropModule,
        MatSelectModule,
        MatCardModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatPaginatorModule,
        SharedModule,
        ScrollingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        TranslateModule
    ],
  exports: [
    TypePartComponent,
    SingleNotificationPartComponent,
    PeriodicNotificationPartComponent,
    SingleMainPartComponent
  ],
  providers: [
    {provide: 'singleFormNotificationService', useClass: FormNotificationService},
    {provide: 'periodicFormNotificationService', useClass: FormNotificationService},
    SingleFormFactory,
    PeriodicFormFactory,
    NotificationTypesService,
    AlarmsService,
    AlarmValidator
  ]
})
export class AlarmsModule {
}
