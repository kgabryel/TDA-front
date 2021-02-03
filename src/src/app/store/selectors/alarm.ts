import {alarmsAdapter, State} from "../reducers";
import {createSelector} from "@ngrx/store";
import {selectState} from "./selectors";
import {Alarm} from "../../core/models/alarm";
import {EntityState} from "@ngrx/entity";

const alarmsState = createSelector(
  selectState,
  (selectState: State) => selectState.alarms
);
const alarms = alarmsAdapter.getSelectors(alarmsState);
export const selectAlarms = alarms.selectAll;

export const selectAlarm = (id: string) => createSelector(
  alarmsState,
  (alarms: EntityState<Alarm>) => alarms.entities[id]
);
