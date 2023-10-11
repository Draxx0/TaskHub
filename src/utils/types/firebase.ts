import {
  DocumentData,
  DocumentReference,
  WhereFilterOp,
} from "firebase/firestore";
import { FirestoreUser } from "./user";

export interface FirebaseDoc {
  docReference: {
    path: string;
    pathSegments?: string[];
  };
}

export interface FirebaseCreateDoc<T> extends FirebaseDoc {
  data: T;
}

export interface FirebaseCollection {
  params: {
    path: string;
  };
  condition?: GetCollectionCondition;
}

export interface GetCollectionCondition {
  leftConditon: string | FirestoreUser;
  operator: WhereFilterOp;
  rightCondition:
    | DocumentReference<DocumentData, DocumentData>
    | string
    | boolean
    | undefined;
}
