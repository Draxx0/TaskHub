import { Task } from "./task";

export interface List {
  id: string;
  boardId: string;
  title: string;
  color: string;
  tasks: Array<Task>;
}

export interface ICreateList {
  boardId: string;
  title: string;
  color: string;
  tasks: [];
}

export type UpdateList = Omit<ICreateList, "boardId" | "tasks">;
