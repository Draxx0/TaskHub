import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  content: string;
  dueDate: Timestamp;
  image?: string;
  priority: "Low" | "Medium" | "High";
  messages: Message[];
}

export interface Message {
  id: string;
  content: string;
  image?: string;
  createdAt: Timestamp;
  user: User;
}

export type ICreateMessage = Omit<Message, "id" | "createdAt">;

export interface ICreateTask {
  tasks: {
    title: string;
    content: string;
    dueDate: Timestamp;
    id: string;
    image?: string;
    priority: "Low" | "Medium" | "High";
    messages: Message[] | [];
  };
}
