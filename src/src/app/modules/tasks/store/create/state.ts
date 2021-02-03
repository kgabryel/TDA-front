import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Observable} from "rxjs";

interface CreateState {
  mainTask: boolean;
  hasAlarm: boolean;
}

export interface MainTask {
  value: boolean;
}

export interface Alarm {
  value: boolean;
}

@Injectable()
export class CreateStore extends ComponentStore<CreateState> {
  constructor() {
    super({
      mainTask: true,
      hasAlarm: false,
    });
  }

  public getMainTaskState(): Observable<boolean> {
    return this.select(state => state.mainTask);
  }

  public getAlarmState(): Observable<boolean> {
    return this.select(state => state.hasAlarm);
  }

  readonly changeMainTaskState = this.updater((state, mainTask: MainTask) => (
    {
      ...state,
      mainTask: mainTask.value
    }));

  readonly changeAlertState = this.updater((state, alarm: Alarm) => ({
    ...state,
    hasAlarm: alarm.value
  }));
}
