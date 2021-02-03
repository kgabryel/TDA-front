import {Injectable} from '@angular/core';
import {CalendarEvent} from "angular-calendar";
import {Task} from '../../models/task'
import {startOfDay} from "date-fns";
import {Store} from "@ngrx/store";
import {State} from "../../../store/reducers";
import {taskStatusLoad} from "../../../store/actions";
import {selectTaskStatuses} from "../../../store/selectors/task-status";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class EventParserService {

  private store: Store<State>;

  constructor(store: Store<State>) {
    store.dispatch(taskStatusLoad());
    this.store = store;
  }

  public parse(tasks: Task[]): Observable<CalendarEvent[]> {
    return this.store.select(selectTaskStatuses).pipe(map(statuses => {
      if (statuses === []) {
        return;
      }
      let events: CalendarEvent[] = [];
      tasks.forEach((task: Task) => {
        if (task.periodic) {
          task.tasks.forEach((task: Task) => {
            events.push({
              title: task.title,
              start: startOfDay(new Date(task.date)),
              color: {
                primary: statuses.find((status) => status.id == task.status).color,
                secondary: statuses.find((status) => status.id == task.status).color
              },
              id: task.id
            });
          });
        } else {
          events.push({
            title: task.title,
            start: startOfDay(new Date(task.date)),
            color: {
              primary: statuses.find((status) => status.id == task.status).color,
              secondary: statuses.find((status) => status.id == task.status).color
            },
            id: task.id
          });
        }
      });
      return events;
    }));
  }
}
