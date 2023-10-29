import { Task } from "./task";

export interface List {
  id: string;
  boardId: string;
  title: string;
  color: string;
  tasks: Array<Task>;
}
