import {Component, Inject, OnInit} from '@angular/core';
import {SidenavService} from "../../../../core/services/sidenav/sidenav.service";
import {LayoutConfig} from "../../../../config/layout.config";
import {ImagesConfig} from "../../../../config/images.config";

@Component({
  selector: 'header-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private sidenavService: SidenavService<void>
  public logoPath: string;

  constructor(@Inject(LayoutConfig.menuServiceName) sidenavService: SidenavService<void>) {
    this.sidenavService = sidenavService;
    this.logoPath = ImagesConfig.logoPath;
  }

  ngOnInit(): void {
  }

  public showMenu() {
    this.sidenavService.changeStatus({
      open: true,
      model: null
    });
  }
}
