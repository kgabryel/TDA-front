import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable} from "rxjs";
import {Task} from "../../../../core/models/task";

@Component({
  selector: 'menu-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('tasks-slide', [
      state('show', style({height: '*'})),
      state('hide', style({
        height: 0,
        overflow: 'hidden'
      })),
      transition('hide <=> show', animate('0.3s'))
    ])
  ]
})
export class TasksComponent implements OnInit {

  public expanded: boolean;
  public state: string;
  @Input() public tasks: Observable<Task[]>;
  @Input() public headerName: string;
  public limit: number;
  public length: number;

  constructor() {
    this.state = 'hide';
    this.limit = 5;
    this.length = 0;
  }

  ngOnInit(): void {
    this.tasks.subscribe(tasks => this.length = tasks.length);
  }

  public toggle() {
    this.expanded = !this.expanded;
    this.state = (this.state === 'hide' ? 'show' : 'hide');
  }

}
