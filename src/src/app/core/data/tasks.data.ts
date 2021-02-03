export interface TasksData {
  id: number;
  title: string;
  subTasks: TasksData[];
  status: number;
}
