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
}
