export interface getFirebaseDoc {
  docReference: {
    path: string;
    pathSegments?: string[];
  };
}

export interface getFirebaseCollection {
  params: {
    path: string;
  };
}
