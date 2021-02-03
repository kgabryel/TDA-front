export interface Task {
  id: string;
  title: string;
  content: string;
  date: string | null;
  status: number;
  parentId: string | null;
  subtasks: number[],
  alarm: string | null,
  periodic: boolean;
  tasks: Task[] | null;
}

export interface SingleTask {
  id: string;
  title: string;
  content: string;
  date: string | null;
  status: number;
  parentId: number | null;
  alarm: string | null;
}

export interface PeriodicTask {
  id: string;
  title: string;
  content: string;
  start: string;
  stop: string | null;
  interval: number;
  intervalType: string;
  tasks: SingleTask[];
  alarm: string | null;
}
export type TaskType = Task | SingleTask | PeriodicTask;
