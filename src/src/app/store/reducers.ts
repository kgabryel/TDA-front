import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {
  alarmLoad,
  alarmLoadSuccess,
  taskLoad,
  taskLoadSuccess,
  taskStatusLoad,
  taskStatusLoadSuccess,
  alarmsSingleCreate,
  alarmsSingleCreateSuccess,
  alarmsPeriodicCreate,
  alarmsPeriodicCreateSuccess,
  tasksSingleCreate,
  tasksSingleCreateSuccess,
  tasksPeriodicCreateSuccess,
  tasksPeriodicCreate,
  alarmCheck,
  alarmCheckSuccess,
  notificationCheck,
  notificationCheckSuccess,
  alarmUncheck,
  alarmUncheckUnmodified,
  alarmUncheckModified,
  notificationUncheck,
  notificationUncheckUnmodified,
  notificationUncheckModified,
  alarmSingleDelete,
  alarmPeriodicDelete,
  notificationDelete,
  alarmDeleteSuccess,
  notificationDeleteSuccess,
  notificationTypesLoad,
  notificationTypesLoadSuccess,
  taskChangeStatus,
  taskChangeStatusSuccess,
  taskSingleDelete,
  taskPeriodicDelete,
  taskDeleteSuccess,
  notificationTypesLoadError,
  alarmLoadError,
  alarmSingleDeleteError,
  alarmPeriodicDeleteError,
  notificationDeleteError,
  alarmCheckError,
  alarmUncheckError,
  notificationUncheckError,
  notificationCheckError,
  taskChangeStatusError,
  taskLoadError,
  taskStatusLoadError,
  tasksSingleCreateError,
  tasksPeriodicCreateError,
  taskSingleDeleteError,
  taskPeriodicDeleteError, alarmsSingleCreateError, alarmsPeriodicCreateError
} from "./actions";
import {Alarm} from "../core/models/alarm";
import {Task} from "../core/models/task";
import {TaskStatus} from "../core/models/task-status";
import {NotificationType} from "../core/models/notification-type";


export interface State {
  alarms: EntityState<Alarm>,
  alarmsLoaded: boolean,
  tasks: EntityState<Task>,
  tasksLoaded: boolean,
  tasksStatuses: EntityState<TaskStatus>,
  tasksStatusesLoaded: boolean,
  taskStatusDone: number,
  taskStatusUndone: number,
  notificationsTypes: EntityState<NotificationType>,
  notificationsTypesLoaded: boolean
}

export const key = 'main';
export const alarmsAdapter: EntityAdapter<Alarm> = createEntityAdapter<Alarm>();
export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();
export const tasksStatusesAdapter: EntityAdapter<TaskStatus> = createEntityAdapter<TaskStatus>();
export const typesAdapter: EntityAdapter<NotificationType> = createEntityAdapter<NotificationType>();

const initialState: State = {
  alarms: alarmsAdapter.getInitialState(),
  alarmsLoaded: false,
  tasks: tasksAdapter.getInitialState(),
  tasksLoaded: false,
  tasksStatuses: tasksStatusesAdapter.getInitialState(),
  tasksStatusesLoaded: false,
  taskStatusDone: 0,
  taskStatusUndone: 0,
  notificationsTypes: typesAdapter.getInitialState(),
  notificationsTypesLoaded: false
}
export const reducer = createReducer(
  initialState,
  on(notificationTypesLoad, (state) => state),
  on(notificationTypesLoadError, (state) => state),
  on(notificationTypesLoadSuccess, (state, action) => (
    {
      ...state,
      notificationsTypesLoaded: true,
      notificationsTypes: typesAdapter.addMany(action.notificationTypes, state.notificationsTypes)
    })),
  on(alarmLoad, (state) => state),
  on(alarmLoadError, (state) => state),
  on(alarmLoadSuccess, (state, action) => (
    {
      ...state,
      alarmsLoaded: true,
      alarms: alarmsAdapter.addMany(action.alarms, state.alarms)
    })),
  on(alarmsSingleCreate, (state) => state),
  on(alarmsSingleCreateError, (state) => state),
  on(alarmsSingleCreateSuccess, (state, action) => ({
    ...state,
    alarms: alarmsAdapter.addOne(action.alarm, state.alarms)
  })),
  on(alarmCheck, (state) => state),
  on(alarmCheckError, (state) => state),
  on(alarmCheckSuccess, (state, action) => ({
    ...state,
    alarms: alarmsAdapter.updateOne(action.alarm, state.alarms)
  })),
  on(alarmUncheck, (state) => state),
  on(alarmUncheckError, (state) => state),
  on(alarmUncheckUnmodified, (state) => state),
  on(alarmUncheckModified, (state, action) => ({
    ...state,
    alarms: alarmsAdapter.updateOne(action.alarm, state.alarms)
  })),
  on(notificationCheck, (state) => state),
  on(notificationCheckError, (state) => state),
  on(notificationCheckSuccess, (state, action) => ({
    ...state,
    alarms: alarmsAdapter.updateOne(action.alarm, state.alarms)
  })),
  on(notificationUncheck, (state) => state),
  on(notificationUncheckError, (state) => state),
  on(notificationUncheckUnmodified, (state) => state),
  on(notificationUncheckModified, (state, action) => ({
    ...state,
    alarms: alarmsAdapter.updateOne(action.alarm, state.alarms)
  })),
  on(tasksSingleCreate, (state) => state),
  on(tasksSingleCreateError, (state) => state),
  on(tasksSingleCreateSuccess, (state, action) => ({
    ...state,
    tasks: tasksAdapter.addOne(action.task, state.tasks)
  })),
  on(tasksPeriodicCreate, (state) => state),
  on(tasksPeriodicCreateError, (state) => state),
  on(tasksPeriodicCreateSuccess, (state, action) => ({
    ...state,
    tasks: tasksAdapter.addOne(action.task, state.tasks)
  })),
  on(alarmsPeriodicCreate, (state) => state),
  on(alarmsPeriodicCreateError, (state) => state),
  on(alarmsPeriodicCreateSuccess, (state, action) => ({
    ...state,
    alarms: alarmsAdapter.addOne(action.alarm, state.alarms)
  })),
  on(taskLoad, (state) => state),
  on(taskLoadError, (state) => state),
  on(taskLoadSuccess, (state, action) => (
    {
      ...state,
      tasksLoaded: true,
      tasks: tasksAdapter.addMany(action.tasks, state.tasks)
    })),
  on(taskStatusLoad, (state) => state),
  on(taskStatusLoadError, (state) => state),
  on(taskStatusLoadSuccess, (state, action) => (
    {
      ...state,
      tasksStatusesLoaded: true,
      taskStatusDone: action.statuses.done,
      taskStatusUndone: action.statuses.undone,
      tasksStatuses: tasksStatusesAdapter.addMany(action.statuses.statuses, state.tasksStatuses)
    })),
  on(taskChangeStatus, (state) => state),
  on(taskChangeStatusError, (state) => state),
  on(taskChangeStatusSuccess, (state, action) => ({
    ...state,
    tasks: tasksAdapter.updateOne(action.task, state.tasks)
  })),
  on(alarmSingleDelete, (state) => state),
  on(alarmSingleDeleteError, (state) => state),
  on(alarmPeriodicDelete, (state) => state),
  on(alarmPeriodicDeleteError, (state) => state),
  on(notificationDelete, (state) => state),
  on(notificationDeleteError, (state) => state),
  on(alarmDeleteSuccess, (state, action) => ({
    ...state,
    alarms: alarmsAdapter.removeOne(action.id, state.alarms)
  })),
  on(notificationDeleteSuccess, (state, action) => ({
    ...state,
    alarms: alarmsAdapter.updateOne(action.alarm, state.alarms)
  })),

  on(taskSingleDelete, (state) => state),
  on(taskSingleDeleteError, (state) => state),
  on(taskPeriodicDelete, (state) => state),
  on(taskPeriodicDeleteError, (state) => state),
  on(taskDeleteSuccess, (state, action) => ({
    ...state,
    tasks: tasksAdapter.removeOne(action.id, state.tasks)
  })),
);
