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

export interface FirebaseCollection<T> extends FirebaseDoc {
  condition?: GetCollectionCondition<T>;
}

export interface GetCollectionCondition<K> {
  leftConditon: string | FirestoreUser;
  operator: WhereFilterOp;
  rightCondition: K | string | boolean | undefined;
}
