import { FirestoreUser } from "./user";
import { ITimestamp } from "./timestamp";
import { FirebaseDocData } from "./firebase";

export interface Workshop extends ITimestamp {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  owner: FirebaseDocData<FirestoreUser>;
}

export interface WorkshopCreate {
  name: string;
  description: string;
  coverUrl: string;
  owner: FirebaseDocData<FirestoreUser>;
}
