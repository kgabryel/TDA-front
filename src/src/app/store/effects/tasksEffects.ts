import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {
  taskChangeStatus, taskChangeStatusError, taskChangeStatusSuccess, taskDeleteSuccess,
  taskLoad, taskLoadError,
  taskLoadSuccess, taskPeriodicDelete, taskPeriodicDeleteError, taskSingleDelete, taskSingleDeleteError,
  tasksPeriodicCreate, tasksPeriodicCreateError, tasksPeriodicCreateSuccess,
  tasksSingleCreate, tasksSingleCreateError,
  tasksSingleCreateSuccess,
  taskStatusLoad, taskStatusLoadError,
  taskStatusLoadSuccess,
} from "../actions";
import {TasksService} from "../../core/services/tasks/tasks.service";
import {NotificationService} from "../../core/services/notification/notification.service";
import {Update} from "@ngrx/entity";
import {Task} from "../../core/models/task";
import {Router} from "@angular/router";
import {PathUtils} from "../../core/utils/path.utils";
import {RoutingConfig} from "../../config/routing.config";
import {of} from "rxjs";


@Injectable()
export class TasksEffects {

  private actions: Actions;
  private tasksService: TasksService;
  private notificationService: NotificationService;
  private router: Router;
  loadTasks;
  loadStatuses;
  addSingleTask;
  addPeriodicTask;
  changeTaskStatus;
  taskSingleDelete;
  taskPeriodicDelete
  constructor(actions: Actions, tasksService: TasksService, notificationService: NotificationService, router: Router) {
    this.actions = actions;
    this.tasksService = tasksService;
    this.notificationService = notificationService;
    this.router = router;
    this.createLoadTasks();
    this.createLoadStatuses();
    this.createAddSingleTask();
    this.createAddPeriodicTask();
    this.addChangeTaskStatus();
    this.createDeleteSingle();
    this.createDeletePeriodic();
  }

  private addChangeTaskStatus() {
    this.changeTaskStatus = createEffect(() =>
      this.actions.pipe(
        ofType(taskChangeStatus),
        mergeMap(action => this.tasksService.changeStatus(action.id, action.status).pipe(
          tap(() => this.notificationService.showMessage('tasks.statusUpdated')),
          map((task => {
            const update: Update<Task> = {
              id: task.id,
              changes: task
            }
            return taskChangeStatusSuccess({task: update})
          })),
          catchError((error) => {
            this.notificationService.showError(error.status);
            return of(taskChangeStatusError())
          })
        ))
      ));
  }

  private createLoadTasks() {
    this.loadTasks = createEffect(() => this.actions.pipe(
      ofType(taskLoad),
      mergeMap((() => this.tasksService.getAll().pipe(
        map((tasks => taskLoadSuccess({tasks})))
      ))),
      catchError((error) => {
        this.notificationService.showError(error.status);
        return of(taskLoadError())
      })
    ));
  }

  private createLoadStatuses() {
    this.loadStatuses = createEffect(() => this.actions.pipe(
      ofType(taskStatusLoad),
      mergeMap((() => this.tasksService.getStatuses().pipe(
        map((statuses => taskStatusLoadSuccess({statuses})))
      ))),
      catchError((error) => {
        this.notificationService.showError(error.status);
        return of(taskStatusLoadError())
      })
    ));
  }

  private createAddSingleTask() {
    this.addSingleTask = createEffect(() =>
      this.actions.pipe(
        ofType(tasksSingleCreate),
        mergeMap(action => this.tasksService.createSingle(action.task).pipe(
          tap(() => {
            this.router.navigate([PathUtils.concatPath(RoutingConfig.tasks)]);
            this.notificationService.showMessage('tasks.taskCreated');
          }),
          map((task => {
            return tasksSingleCreateSuccess({task})
          })),
          catchError((error) => {
            this.notificationService.showError(error.status);
            return of(tasksSingleCreateError())
          })
        ))
      ));
  }

  private createAddPeriodicTask() {
    this.addPeriodicTask = createEffect(() =>
      this.actions.pipe(
        ofType(tasksPeriodicCreate),
        mergeMap(action => this.tasksService.createPeriodic(action.task).pipe(
          tap(() => {
            this.router.navigate([PathUtils.concatPath(RoutingConfig.tasks)]);
            this.notificationService.showMessage('tasks.taskCreated');
          }),
          map((task => {
            return tasksPeriodicCreateSuccess({task})
          })),
          catchError((error) => {
            this.notificationService.showError(error.status);
            return of(tasksPeriodicCreateError())
          })
        ))
      ));
  }

  private createDeleteSingle() {
    this.taskSingleDelete = createEffect(() => this.actions.pipe(
      ofType(taskSingleDelete),
      mergeMap(((action) => this.tasksService.deleteTask(action.id, false).pipe(
        tap(() => this.notificationService.showMessage('tasks.taskDeleted')),
        map((id => {
          return taskDeleteSuccess({id})
        })),
        catchError((error) => {
          this.notificationService.showError(error.status);
          return of(taskSingleDeleteError())
        })
      )))
    ));
  }

  private createDeletePeriodic() {
    this.taskPeriodicDelete = createEffect(() => this.actions.pipe(
      ofType(taskPeriodicDelete),
      mergeMap(((action) => this.tasksService.deleteTask(action.id, true).pipe(
        tap(() => this.notificationService.showMessage('tasks.taskDeleted')),
        map((id => {
          return taskDeleteSuccess({id})
        })),
        catchError((error) => {
          this.notificationService.showError(error.status);
          return of(taskPeriodicDeleteError())
        })
      )))
    ));
  }
}
