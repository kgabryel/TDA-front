import {createSelector} from "@ngrx/store";
import {State, tasksStatusesAdapter} from "../reducers";
import {selectState} from "./selectors";
import {EntityState} from "@ngrx/entity";
import {TaskStatus} from "../../core/models/task-status";
import {Task} from "../../core/models/task";

const statusesState = createSelector(
  selectState,
  (selectState: State) => selectState.tasksStatuses
);
const statuses = tasksStatusesAdapter.getSelectors(statusesState);

export const selectTaskStatuses = statuses.selectAll;

export const selectStatus = (id: number) => createSelector(
  statusesState,
  (statuses: EntityState<TaskStatus>) => statuses.entities[id]
);

export const selectStatusForTask = (task: Task) => createSelector(
  statusesState,
  (statuses: EntityState<TaskStatus>) => statuses.entities[task.status]
)

export const selectDoneStatus = createSelector(
  selectState,
  (selectState: State) => selectState.taskStatusDone
);
export const selectUndoneStatus = createSelector(
  selectState,
  (selectState: State) => selectState.taskStatusUndone
);

