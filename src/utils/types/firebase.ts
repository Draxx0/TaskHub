import {
  DocumentData,
  DocumentReference,
  WhereFilterOp,
} from "firebase/firestore";
import { FirestoreUser } from "./user";

export interface FirebaseDocRef {
  docReferenceParams: {
    path: string;
    pathSegments?: string[];
  };
}

export interface FirebaseGetDoc extends FirebaseDocRef {
  returnWithId?: boolean;
}

export interface FirebaseCreateDoc<T> extends FirebaseDocRef {
  data: T;
  params?: {
    returnRef?: boolean;
  };
}

export interface FirebaseCreateCollectionInDoc extends FirebaseDocRef {
  collectionName: string;
}

export type FirebaseDocData<T> = T & { id: string };

export interface FirebaseCollection {
  params: {
    path: string;
  };
  condition?: GetCollectionCondition;
}

export interface GetCollectionCondition {
  //! leftCondition should be string | FieldPath check later
  leftConditon: string | FirestoreUser;
  operator: WhereFilterOp;
  rightCondition:
    | DocumentReference<DocumentData, DocumentData>
    | string
    | boolean
    | undefined;
}
