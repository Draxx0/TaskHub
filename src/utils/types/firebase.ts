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

export interface FirebaseUpdateDoc<T> extends FirebaseDoc {
  updateData: T;
}

export interface FirebaseCreateCollectionInDoc<K> extends FirebaseDoc {
  collectionName: string;
  newCollectionFirstDoc?: K;
}

export interface UseQueryOptions {
  queryOptions?: {
    staleTime?: number;
    enabled?: boolean;
  };
}

export interface GetCondition {
  condition?: {
    leftConditon: string | FirestoreUser;
    operator: WhereFilterOp;
    rightCondition: string | boolean | undefined;
  };
}

export interface UseFirebaseGet
  extends UseQueryOptions,
    FirebaseDoc,
    GetCondition {}

export interface FirebaseGet extends FirebaseDoc, GetCondition {}
