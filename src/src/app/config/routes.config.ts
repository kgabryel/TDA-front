import {environment} from "../../environments/environment";

export const bookmarksRoutes = {
  index: environment.baseUrl + 'api/bookmarks',
  getIcon: environment.baseUrl + 'api/bookmarks/getIcon',
  byId: (id: number) => environment.baseUrl + `api/bookmarks/${id}`,
  validateMain: environment.baseUrl + 'api/bookmarks/validateData',
  validateDetails: environment.baseUrl + 'api/bookmarks/validateDetails'
}
export const alarmsRoutes = {
  index: environment.baseUrl + 'api/alarms',
  checkAlarm: (id: string) => environment.baseUrl + `api/alarms/${id}/check`,
  uncheckAlarm: (id: string) => environment.baseUrl + `api/alarms/${id}/uncheck`,
  checkNotification: (id: number) => environment.baseUrl + `api/alarms/notifications/${id}/check`,
  uncheckNotification: (id: number) => environment.baseUrl + `api/alarms/notifications/${id}/uncheck`,
  deleteSingleAlarm: (id: string) => environment.baseUrl + `api/alarms/${id}/single`,
  deletePeriodicAlarm: (id: string) => environment.baseUrl + `api/alarms/${id}/periodic`,
  notificationById: (id: number) => environment.baseUrl + `api/alarms/notifications/${id}`,
  validateSingle: environment.baseUrl + 'api/alarms/validate/single',
  validatePeriodic: environment.baseUrl + 'api/alarms/validate/periodic',
  createSingle: environment.baseUrl + 'api/alarms/create/single',
  createPeriodic: environment.baseUrl + 'api/alarms/create/periodic',
  notificationsTypes: environment.baseUrl + 'api/alarms/notifications/types'
}
export const tasksRoutes = {
  index: environment.baseUrl + 'api/tasks',
  statuses: environment.baseUrl + 'api/tasks/statuses',
  validateSingle: environment.baseUrl + 'api/tasks/validate/single',
  validatePeriodic: environment.baseUrl + 'api/tasks/validate/periodic',
  createSingle: environment.baseUrl + 'api/tasks/create/single',
  createPeriodic: environment.baseUrl + 'api/tasks/create/periodic',
  changeStatus: (id: string) => environment.baseUrl + `api/tasks/${id}/change-status`,
  deleteSingle: (id: string) => environment.baseUrl + `api/tasks/${id}/single`,
  deletePeriodic: (id: string) => environment.baseUrl + `api/tasks/${id}/periodic`,
}

export const notesRoutes = {
  index: environment.baseUrl + 'api/notes',
  validate: environment.baseUrl + '/api/notes/validate',
  byId: (id: number) => environment.baseUrl + `api/notes/${id}`
}

export const authRoutes = {
  login: environment.baseUrl + 'api/login',
  register: environment.baseUrl + 'api/register',
  refreshToken: environment.baseUrl + 'api/refreshToken'
}
