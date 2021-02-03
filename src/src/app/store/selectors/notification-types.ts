import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EntityState} from "@ngrx/entity";
import {NotificationType} from "../../core/models/notification-type";
import {key, State, typesAdapter} from "../reducers";

const selectState = createFeatureSelector<State>(key);

const notificationTypesState = createSelector(
  selectState,
  (selectState: State) => selectState.notificationsTypes
);

const notificationTypes = typesAdapter.getSelectors(notificationTypesState);
export const selectNotificationTypes = notificationTypes.selectAll;
export const selectNotificationType = id => createSelector(
  notificationTypesState,
  (types: EntityState<NotificationType>) => types.entities[id]
);
