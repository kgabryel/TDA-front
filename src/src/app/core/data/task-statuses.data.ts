import {TaskStatus} from "../models/task-status";

export interface TaskStatusesData {
  done: number;
  undone: number;
  statuses: TaskStatus[]
}
