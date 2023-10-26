import { WhereFilterOp } from "firebase/firestore";
import { FirestoreUser } from "./user";

export interface FirebaseDoc {
  docReference: {
    path: string;
    pathSegments?: string[];
  };
}

export interface FirebaseCreateDoc<T> extends FirebaseDoc {
  data: T;
  returnOptions?: {
    returnData?: boolean;
    returnWithId?: boolean;
  };
}

export interface FirebaseCreateCollectionInDoc<K> extends FirebaseDoc {
  collectionName: string;
  newCollectionFirstDoc?: K;
}

export interface FirebaseCollection extends FirebaseDoc {
  condition?: GetCollectionCondition;
}

export interface GetCollectionCondition {
  leftConditon: string | FirestoreUser;
  operator: WhereFilterOp;
  rightCondition: string | boolean | undefined;
}
