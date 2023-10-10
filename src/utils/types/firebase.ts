import { WhereFilterOp } from "firebase/firestore";

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
  leftConditon: string;
  operator: WhereFilterOp;
  rightCondition: string | boolean;
}
