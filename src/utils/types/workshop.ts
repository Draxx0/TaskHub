import { FirestoreUser } from "./user";

export interface Workshop {
  id: string;
  name: string;
  description: string;
  owner: FirestoreUser;
}
