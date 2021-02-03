import {Component, Inject, OnInit} from '@angular/core';
import {menuElements} from "../../../../config/menu-elements.config";
import {Observable} from "rxjs";
import {SidenavService, Wrapper} from "../../../../core/services/sidenav/sidenav.service";
import {ImagesConfig} from "../../../../config/images.config";
import {MenuElementData} from "../../../../core/data/menu-element.data";
import {LayoutConfig} from "../../../../config/layout.config";
import {Task} from "../../../../core/models/task";
import {selectTasksForToday, selectUndoneTasks} from "../../../../store/selectors/task";
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";

@Component({
  selector: 'menu-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {

  public menuElements: MenuElementData[];
  public showed$: Observable<Wrapper<void>>
  public logoPath: string;
  private sidenavService: SidenavService<void>;
  private store: Store<State>;
  public undoneTasks$: Observable<Task[]>;
  public tasksForToday$: Observable<Task[]>;

  constructor(@Inject(LayoutConfig.menuServiceName) sidenavService: SidenavService<void>, store: Store<State>) {
    this.sidenavService = sidenavService;
    this.logoPath = ImagesConfig.logoPath;
    this.store = store;
  }

  ngOnInit(): void {
    this.showed$ = this.sidenavService.getState();
    this.menuElements = menuElements;
    this.undoneTasks$ = this.store.select(selectUndoneTasks);
    this.tasksForToday$ = this.store.select(selectTasksForToday);
  }

  changeStatus($event) {
    this.sidenavService.changeStatus({
      open: $event,
      model: null
    })
  }
}
