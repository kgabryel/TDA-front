import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PathUtils} from "../../../../core/utils/path.utils";
import {RoutingConfig} from "../../../../config/routing.config";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {Router} from "@angular/router";
import {RegisterService} from "../../../../core/services/register/register.service";
import {AuthFormFactory, formNames} from "../../../../core/factories/auth-form.factory";
import {authErrors, AuthErrors} from "../../../../core/errors/auth.error";

@Component({
  selector: 'auth-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../../shared/scss/form.scss', './register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  public form: FormGroup;
  public loginPath: string;
  private registerService: RegisterService;
  private authService: AuthService;
  private router: Router;
  public errorMessage: string;
  public errors: AuthErrors;
  public formNames;

  constructor(registerService: RegisterService, authService: AuthService, router: Router) {
    this.form = AuthFormFactory.getRegisterForm();
    this.loginPath = PathUtils.concatPath(RoutingConfig.login);
    this.registerService = registerService;
    this.authService = authService;
    this.router = router;
    this.errors = authErrors;
    this.formNames = formNames;
  }

  ngOnInit(): void {
    this.errorMessage = '';
  }


  public submitForm() {
    if (this.form.invalid) {
      return;
    }
    this.registerService.register(this.form.value).subscribe(
      data => {
        if (data.isCorrect) {
          this.authService.storeToken(data);
          this.router.navigateByUrl(PathUtils.concatPath(RoutingConfig.home));
        } else {
          this.errorMessage = data.errorMessage;
        }
      });
  }

}
