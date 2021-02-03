import {Component, Input, OnInit} from '@angular/core';
import {editorConfig} from "../../../../../../config/text-editor.config";
import {CreateStore} from "../../../../store/create/state";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {formNames} from "../../../../../../core/factories/task.factory";
import {State} from "../../../../../../store/reducers";
import {Store} from "@ngrx/store";
import {selectMainTasks} from "../../../../../../store/selectors/task";
import {Task} from "../../../../../../core/models/task";
import {map} from "rxjs/operators";
import {singleTaskErrors, SingleTaskErrors} from "../../../../../../core/errors/tasks.error";

@Component({
  selector: 'tasks-single-task-part',
  templateUrl: './task-part.component.html',
  styleUrls: ['./task-part.component.scss']
})
export class TaskPartComponent implements OnInit {

  public config: AngularEditorConfig;
  @Input() form: FormGroup;
  private createStore: CreateStore;
  public mainTask$: Observable<boolean>;
  public tasks$: Observable<Task[]>;
  public formNames;
  public titleLength: number;
  private store: Store<State>;
  public filteredTasks$: Observable<Task[]>;
  public taskInput: FormControl;
  public errors: SingleTaskErrors;

  constructor(createStore: CreateStore, store: Store<State>) {
    this.store = store;
    this.config = editorConfig;
    this.createStore = createStore;
    this.formNames = formNames;
    this.errors = singleTaskErrors;
  }

  ngOnInit(): void {
    this.titleLength = 0;
    this.taskInput = this.form.get(formNames.search) as FormControl;
    this.tasks$ = this.store.select(selectMainTasks);
    this.taskInput.valueChanges.pipe(
    ).subscribe(value => {
      this.filter(value)
    });
    this.mainTask$ = this.createStore.getMainTaskState();
    this.form.get(this.formNames.title).valueChanges.subscribe(data => this.titleLength = data.length);
  }

  private filter(value: string | Task): void {
    let search: string;
    if (typeof value === 'string') {
      search = value;
    } else {
      search = value.title;
    }
    const filterValue = search.toLowerCase();
    this.filteredTasks$ = this.tasks$.pipe(map(task => {
      return task.filter(task => task.title.toLowerCase().indexOf(filterValue) === 0);
    }));
  }

  displayFn(task: Task): string {
    return task ? task.title : '';
  }

}
