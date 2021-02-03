import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './pages/index/index.component';
import {CreateComponent} from './pages/create/create.component';
import {TasksRoutingModule} from "./tasks-routing.module";
import {FormComponent as PeriodicFormComponent} from './components/periodic-form/form/form.component';
import {SmallFormComponent as PeriodicSmallFormComponent} from './components/periodic-form/small-form/small-form.component';
import {BigFormComponent as PeriodicBigFormComponent} from './components/periodic-form/big-form/big-form.component';
import {FormComponent as SingleFormComponent} from './components/single-form/form/form.component';
import {SmallFormComponent as SingleSmallFormComponent} from './components/single-form/small-form/small-form.component';
import {BigFormComponent as SingleBigFormComponent} from './components/single-form/big-form/big-form.component';
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {TypeSwitchComponent} from './components/single-form/type-switch/type-switch.component';
import {AlarmSwitchComponent} from './components/alarm-switch/alarm-switch.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CreateStore} from "./store/create/state";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {FormNotificationService} from "../../core/services/form-notification/form-notification.service";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {TaskPartComponent as SingleTaskPartComponent} from "./components/single-form/parts/task-part/task-part.component";
import {TaskPartComponent as PeriodicTaskPartComponent} from "./components/periodic-form/parts/task-part/task-part.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {StatusSheetComponent} from './components/status-sheet/status-sheet.component';
import {MatListModule} from "@angular/material/list";
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AlarmsModule} from "../alarms/alarms.module";
import {PeriodicFormFactory, SingleFormFactory} from "../../core/factories/task.factory";
import {SharedModule} from "../shared/shared.module";
import {TaskSingleComponent} from './components/task-single/task-single.component';
import {TaskPeriodicComponent} from './components/task-periodic/task-periodic.component';
import {SubtaskComponent} from './components/subtask/subtask.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {TranslateModule} from "@ngx-translate/core";
import { ToDoComponent } from './pages/to-do/to-do.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {TaskValidator} from "../../core/validators/tasks/task.validator";

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    PeriodicFormComponent,
    PeriodicSmallFormComponent,
    PeriodicBigFormComponent,
    SingleFormComponent,
    SingleSmallFormComponent,
    SingleBigFormComponent,
    TypeSwitchComponent,
    AlarmSwitchComponent,
    SingleTaskPartComponent,
    PeriodicTaskPartComponent,
    StatusSheetComponent,
    TaskSingleComponent,
    TaskPeriodicComponent,
    SubtaskComponent,
    ToDoComponent
  ],
    imports: [
        CommonModule,
        TasksRoutingModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        AngularEditorModule,
        MatSelectModule,
        MatStepperModule,
        MatExpansionModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatBottomSheetModule,
        MatProgressBarModule,
        AlarmsModule,
        SharedModule,
        ScrollingModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        TranslateModule,
        MatPaginatorModule
    ],
  exports: [
    StatusSheetComponent,
    TaskSingleComponent,
    TaskPeriodicComponent
  ],
  providers: [
    CreateStore,
    {provide: 'singleFormNotificationService', useClass: FormNotificationService},
    {provide: 'periodicFormNotificationService', useClass: FormNotificationService},
    SingleFormFactory,
    PeriodicFormFactory,
    TaskValidator
  ]
})
export class TasksModule {
}
