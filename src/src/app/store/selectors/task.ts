import {createSelector} from "@ngrx/store";
import {Task} from "../../core/models/task";
import {State, tasksAdapter} from "../reducers";
import {selectState} from "./selectors";
import {startOfDay} from "date-fns";
import {EntityState} from "@ngrx/entity";
import {selectDoneStatus, selectUndoneStatus} from "./task-status";

const tasksState = createSelector(
  selectState,
  (selectState: State) => selectState.tasks
);
const tasks = tasksAdapter.getSelectors(tasksState);

export const selectTasks = tasks.selectAll;

export const selectMainTasks = createSelector(
  selectTasks,
  (tasks: Task[]) => (tasks.filter((task) => (task.parentId === null)))
);

export const selectSubtasks = (id: string) => createSelector(
  selectTasks,
  (tasks: Task[]) => (tasks.filter((task) => (task.parentId === id)))
);
export const selectTasksForToday = createSelector(
  selectTasks,
  selectDoneStatus,
  selectUndoneStatus,
  (tasks: Task[], doneStatus, undoneStatus) => (tasks.filter((task) => (
    (task.status !== doneStatus && task.status !== undoneStatus) && (
      task.date === null || startOfDay(Date.parse(task.date)).getTime() === startOfDay(new Date()).getTime()
    ) && !task.periodic
  )))
);

export const selectUndoneTasks = createSelector(
  selectTasks,
  selectUndoneStatus,
  (tasks: Task[], undoneStatus) => tasks.filter((task) => (task.status === undoneStatus && !task.periodic))
);

export const selectTasksToDone = createSelector(
  selectTasks,
  (tasks: Task[]) => (tasks.filter((task) => (task.status !== 4)))
);
export const selectTasksWithDate = createSelector(
  selectTasks,
  (tasks: Task[]) => (tasks.filter((task) => (task.date !== null)))
);

export const selectTask = (id: string) => createSelector(
  tasksState,
  (tasks: EntityState<Task>) => tasks.entities[id]
);
