import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {PathUtils} from "../../../../core/utils/path.utils";
import {RoutingConfig} from "../../../../config/routing.config";

@Component({
  selector: 'header-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  public logout() {
    AuthService.clearTokens();
    this.router.navigateByUrl(PathUtils.concatPath(RoutingConfig.login));
  }
}
