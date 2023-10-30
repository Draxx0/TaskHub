import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  content: string;
  dueDate: Timestamp;
  image?: string;
}

export interface ICreateTask {
  tasks: {
    title: string;
    content: string;
    dueDate: Timestamp;
    id: string;
    image?: string;
  };
}
