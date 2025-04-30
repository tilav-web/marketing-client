export type TaskStatus = "task" | "not-completed" | "in-progress" | "done";

export interface ITask {
  _id: string;
  task: string;
  status: TaskStatus;
  message?: string;
  done?: Date;
}
