import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tasksRoutes} from "../../../config/routes.config";
import {Task} from "../../models/task";
import {TaskStatusesData} from "../../data/task-statuses.data";
import {PeriodicTaskRequest, SingleTaskRequest} from "../../requests/tasks.request";
import {map} from "rxjs/operators";

@Injectable()
export class TasksService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(tasksRoutes.index);
  }

  public getStatuses(): Observable<TaskStatusesData> {
    return this.httpClient.get<TaskStatusesData>(tasksRoutes.statuses);
  }

  public createSingle(task: SingleTaskRequest): Observable<Task> {
    return this.httpClient.post<Task>(tasksRoutes.createSingle, task);
  }

  public createPeriodic(task: PeriodicTaskRequest): Observable<Task> {
    return this.httpClient.post<Task>(tasksRoutes.createPeriodic, task);
  }

  public changeStatus(task: string, status: number): Observable<Task> {
    return this.httpClient.post<Task>(tasksRoutes.changeStatus(task), {
      status: status
    });
  }

  public deleteTask(id: string, isPeriodic: boolean): Observable<string> {
    let route: string;
    if (isPeriodic) {
      route = tasksRoutes.deletePeriodic(id);
    } else {
      route = tasksRoutes.deleteSingle(id);
    }
    return this.httpClient.delete<any>(route).pipe(
      map(() => id)
    );
  }
}
