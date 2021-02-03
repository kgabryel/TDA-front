import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {ErrorsContainerComponent} from './components/errors-container/errors-container.component';
import {EmptyStringPipe} from './pipes/empty-string/empty-string.pipe';
import {AddSecondsPipe} from './pipes/add-seconds/add-seconds.pipe';
import {TranslateModule} from "@ngx-translate/core";
import {LangComponent} from "./components/lang/lang.component";


@NgModule({
  declarations: [LangComponent, ErrorMessageComponent, ErrorsContainerComponent, EmptyStringPipe, AddSecondsPipe],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    LangComponent,
    ErrorMessageComponent,
    ErrorsContainerComponent,
    EmptyStringPipe,
    AddSecondsPipe
  ]
})
export class SharedModule {
}
