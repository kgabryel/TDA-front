import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {MenuElementData} from "../../../../core/data/menu-element.data";

@Component({
  selector: 'menu-menu-element',
  templateUrl: './menu-element.component.html',
  styleUrls: ['./menu-element.component.scss']
})
export class MenuElementComponent implements OnInit {

  @Input() data: MenuElementData;
  private router: Router;
  private route: ActivatedRoute;
  public active: boolean;

  constructor(router: Router, route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

  ngOnInit(): void {
    this.active = this.route['_routerState'].snapshot.url == this.data.href;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(data => {
      this.changeStatus(data as NavigationEnd);
    });
  }

  private changeStatus(navigationEvent: NavigationEnd) {
    this.active = navigationEvent.url == this.data.href;
  }

}
