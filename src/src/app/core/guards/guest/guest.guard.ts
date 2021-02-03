import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {PathUtils} from "../../utils/path.utils";
import {RoutingConfig} from "../../../config/routing.config";
import {mergeMap} from "rxjs/operators";

@Injectable()
export class GuestGuard implements CanActivate {
  private authService: AuthService;
  private router: Router;

  public constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLogged().pipe(mergeMap((result) => {
      if (!result) {
        return of(true);
      }
      return this.router.navigate([PathUtils.concatPath(RoutingConfig.login)]);
    }));
  }
}
