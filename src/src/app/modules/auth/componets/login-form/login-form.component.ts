import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {RoutingConfig} from "../../../../config/routing.config";
import {PathUtils} from "../../../../core/utils/path.utils";
import {LoginService} from "../../../../core/services/login/login.service";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {Router} from "@angular/router";
import {AuthFormFactory, formNames} from "../../../../core/factories/auth-form.factory";
import {authErrors, AuthErrors} from "../../../../core/errors/auth.error";

@Component({
  selector: 'auth-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../../shared/scss/form.scss', './login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public form: FormGroup;
  public registrationPath: string;
  private loginService: LoginService
  private authService: AuthService;
  private router: Router;
  public errorMessage: string;
  public errors: AuthErrors;
  public formNames;

  constructor(loginService: LoginService, authService: AuthService, router: Router) {
    this.form = AuthFormFactory.getLoginForm();
    this.registrationPath = PathUtils.concatPath(RoutingConfig.registration);
    this.errors = authErrors;
    this.loginService = loginService;
    this.authService = authService;
    this.router = router;
    this.formNames = formNames;
  }

  ngOnInit(): void {
    this.errorMessage = '';
    this.form.get(formNames.email).valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
    this.form.get(formNames.password).valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  public submitForm() {
    if (this.form.invalid) {
      return;
    }
    this.loginService.login(this.form.value).subscribe(
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
