import { DocumentData, DocumentReference } from "firebase/firestore";
import { FirestoreUser } from "./user";
import { ITimestamp } from "./timestamp";
import { Board } from "./board";

export interface Workshop extends ITimestamp {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  owner: FirestoreUser;
  boards?: Array<Board>;
}

export interface WorkshopCreate {
  name: string;
  description: string;
  coverUrl: string;
  owner: DocumentReference<DocumentData, DocumentData>;
}
