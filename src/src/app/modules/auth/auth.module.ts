import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginFormComponent} from './componets/login-form/login-form.component';
import {RegisterFormComponent} from './componets/register-form/register-form.component';
import {FormContainerComponent} from './componets/form-container/form-container.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../shared/shared.module";
import {AuthService} from "../../core/services/auth/auth.service";
import {LoginService} from "../../core/services/login/login.service";
import {RegisterService} from "../../core/services/register/register.service";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoginFormComponent, RegisterFormComponent, FormContainerComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatInputModule,
        SharedModule,
        TranslateModule
    ],
  providers: [
    AuthService,
    LoginService,
    RegisterService
  ]
})
export class AuthModule {
}
