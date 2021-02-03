import {createAction, props} from '@ngrx/store';
import {Alarm, AlarmType} from "../core/models/alarm";
import {Task} from "../core/models/task";
import {TaskStatusesData} from "../core/data/task-statuses.data";
import {PeriodicAlarmRequest, SingleAlarmRequest} from "../core/requests/alarms.request";
import {PeriodicTaskRequest, SingleTaskRequest} from "../core/requests/tasks.request";
import {Update} from "@ngrx/entity";
import {NotificationType} from "../core/models/notification-type";

export const notificationTypesLoad = createAction(
  '[NotificationTypes] Load'
);

export const notificationTypesLoadError = createAction(
  '[NotificationTypes] Load Error'
);

export const notificationTypesLoadSuccess = createAction(
  '[NotificationTypes] Load Success',
  props<{ notificationTypes: NotificationType[] }>()
);

export const alarmLoad = createAction(
  '[Alarms] Load'
);

export const alarmLoadError = createAction(
  '[Alarms] Load Error'
);

export const alarmLoadSuccess = createAction(
  '[Alarms] Load Success',
  props<{ alarms: Alarm[] }>()
);

export const alarmCheck = createAction(
  '[Alarms] Check',
  props<{ id: string }>()
);

export const alarmCheckError = createAction(
  '[Alarms] Check Error'
);

export const alarmUncheck = createAction(
  '[Alarms] Uncheck',
  props<{ id: string }>()
);

export const alarmUncheckError = createAction(
  '[Alarms] Uncheck Error'
);

export const alarmUncheckModified = createAction(
  '[Alarms] Uncheck Modified',
  props<{ alarm: Update<Alarm> }>()
);

export const alarmUncheckUnmodified = createAction(
  '[Alarms] Uncheck Unmodified'
);

export const alarmCheckSuccess = createAction(
  '[Alarms] Check Success',
  props<{ alarm: Update<Alarm> }>()
);

export const notificationCheck = createAction(
  '[Notifications] Check',
  props<{ id: number }>()
);

export const notificationCheckError = createAction(
  '[Notifications] Check Error'
);

export const notificationCheckSuccess = createAction(
  '[Notifications] Check Success',
  props<{ alarm: Update<Alarm> }>()
);

export const notificationUncheck = createAction(
  '[Notifications] Uncheck',
  props<{ id: number }>()
);

export const notificationUncheckError = createAction(
  '[Notifications] Uncheck Error'
);

export const notificationUncheckModified = createAction(
  '[Notifications] Uncheck Modified',
  props<{ alarm: Update<Alarm> }>()
);

export const notificationUncheckUnmodified = createAction(
  '[Notifications] Uncheck Unmodified'
);


export const taskLoad = createAction(
  '[Tasks] Load'
);

export const taskLoadError = createAction(
  '[Tasks] Load Error'
);

export const taskLoadSuccess = createAction(
  '[Tasks] Load Success',
  props<{ tasks: Task[] }>()
);

export const taskSingleDelete = createAction(
  '[Tasks] Delete Single',
  props<{ id: string }>()
);

export const taskSingleDeleteError = createAction(
  '[Tasks] Delete Single Error'
);

export const taskPeriodicDelete = createAction(
  '[Tasks] Delete Periodic',
  props<{ id: string }>()
);

export const taskPeriodicDeleteError = createAction(
  '[Tasks] Delete Periodic Error'
);

export const taskDeleteSuccess = createAction(
  '[Tasks] Delete Success',
  props<{ id: any }>()
);

export const taskStatusLoad = createAction(
  '[Tasks Statuses] Load'
);

export const taskStatusLoadError = createAction(
  '[Tasks Statuses] Load Error'
);

export const taskStatusLoadSuccess = createAction(
  '[Tasks Statuses] Load Success',
  props<{ statuses: TaskStatusesData }>()
);

export const taskChangeStatus = createAction(
  '[Tasks] Change Status',
  props<{ id: string, status: number }>()
);

export const taskChangeStatusError = createAction(
  '[Tasks] Change Status Error'
);

export const taskChangeStatusSuccess = createAction(
  '[Tasks] Change Status Success',
  props<{ task: Update<Task> }>()
);

export const alarmsSingleCreate = createAction(
  '[AlarmsSingle] Create',
  props<{ alarm: SingleAlarmRequest }>()
);

export const alarmsSingleCreateError = createAction(
  '[AlarmsSingle] Create Error'
);

export const alarmsSingleCreateSuccess = createAction(
  '[AlarmsSingle] Create Success',
  props<{ alarm: Alarm }>()
);

export const alarmsPeriodicCreate = createAction(
  '[AlarmsPeriodic] Create',
  props<{ alarm: PeriodicAlarmRequest }>()
);

export const alarmsPeriodicCreateError = createAction(
  '[AlarmsPeriodic] Create Error'
);

export const alarmsPeriodicCreateSuccess = createAction(
  '[AlarmsPeriodic] Create Success',
  props<{ alarm: Alarm }>()
);

export const tasksSingleCreate = createAction(
  '[TasksSingle] Create',
  props<{ task: SingleTaskRequest }>()
);

export const tasksSingleCreateError = createAction(
  '[TasksSingle] Create Error'
);

export const tasksSingleCreateSuccess = createAction(
  '[TasksSingle] Create Success',
  props<{ task: Task }>()
);

export const tasksPeriodicCreate = createAction(
  '[TasksPeriodic] Create',
  props<{ task: PeriodicTaskRequest }>()
);

export const tasksPeriodicCreateError = createAction(
  '[TasksPeriodic] Create Error'
);

export const tasksPeriodicCreateSuccess = createAction(
  '[TasksPeriodic] Create Success',
  props<{ task: Task }>()
);

export const alarmSingleDelete = createAction(
  '[Alarm] Delete Single',
  props<{ id: string }>()
);

export const alarmSingleDeleteError = createAction(
  '[Alarm] Delete Single Error'
);

export const alarmPeriodicDelete = createAction(
  '[Alarm] Delete Periodic',
  props<{ id: string }>()
);

export const alarmPeriodicDeleteError = createAction(
  '[Alarm] Delete Periodic Error'
);

export const alarmDeleteSuccess = createAction(
  '[Alarm] Delete Success',
  props<{ id: any }>()
);

export const notificationDelete = createAction(
  '[Notification] Delete',
  props<{ alarm: AlarmType, id: number }>()
);

export const notificationDeleteError = createAction(
  '[Notification] Delete Error'
);

export const notificationDeleteSuccess = createAction(
  '[Notification] Delete Success',
  props<{ alarm: Update<Alarm> }>()
);
