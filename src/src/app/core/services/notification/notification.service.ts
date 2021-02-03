import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {combineLatest} from "rxjs";
import {Router} from "@angular/router";
import {PathUtils} from "../../utils/path.utils";
import {RoutingConfig} from "../../../config/routing.config";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class NotificationService {
  private snackBar: MatSnackBar;
  private translateService: TranslateService;
  private router: Router;

  constructor(snackBar: MatSnackBar, translateService: TranslateService, router: Router) {
    this.snackBar = snackBar;
    this.translateService = translateService;
    this.router = router;
  }

  public showMessage(key: string, action: string = 'shared.close', duration: number = 2000): void {
    this.showSnackBar(key, action, duration, ['mat-toolbar', 'mat-primary']);
  }

  public showError(error: number, action: string = 'shared.close', duration: number = 2000): void {
    let errorMessage;
    if (error === 401) {
      AuthService.clearTokens();
      this.router.navigateByUrl(PathUtils.concatPath(RoutingConfig.login));
      errorMessage = 'shared.authError';
    } else if (error === 404 || error === 422) {
      errorMessage = 'shared.invalidDataError';
    } else {
      errorMessage = 'shared.serverError';
    }
    this.showSnackBar(errorMessage, action, duration, ['mat-toolbar', 'mat-warn']);
  }

  private showSnackBar(key: string, action: string, duration: number, panelClass: string[]): void {
    const closeMessage = this.translateService.get(action);
    combineLatest(closeMessage, this.translateService.get(key)).subscribe(([close, message]) => {
      this.snackBar.open(message, close, {
        duration: duration,
        panelClass: panelClass
      });
    });
  }
}
