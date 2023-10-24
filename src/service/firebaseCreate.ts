import { db } from "@/service/firebase.config";
import {
  FirebaseCreateCollectionInDoc,
  FirebaseCreateDoc,
} from "@/utils/types/firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { parseDataForFirebase } from "./utils/parseDataForFirebase";
import { firebaseGet } from "./firebaseGet";

const setDocInCollection = async <T>({
  docReferenceParams,
  data,
}: FirebaseCreateDoc<T>) => {
  const docRef = doc(
    db,
    docReferenceParams.path,
    ...(docReferenceParams.pathSegments ?? [])
  );
  try {
    await setDoc(docRef, parseDataForFirebase(data), { merge: true });
  } catch (error) {
    throw new Error("An error occured");
  }
};

const addDocInCollection = async <T>({
  docReferenceParams,
  data,
  params,
}: FirebaseCreateDoc<T>): Promise<void | DocumentReference> => {
  const ref = collection(
    db,
    docReferenceParams.path,
    ...(docReferenceParams.pathSegments ?? [])
  );

  const dataWithDate = {
    ...data,
    createdAt: Timestamp.fromDate(new Date()),
  };

  try {
    if (params?.returnRef) {
      return await addDoc(ref, parseDataForFirebase(dataWithDate));
    }

    await addDoc(ref, parseDataForFirebase(dataWithDate));
  } catch (error) {
    throw new Error("An error occured");
  }
};

const setCollectionInDoc = async <T>({
  docReferenceParams,
  collectionName,
}: FirebaseCreateCollectionInDoc) => {
  try {
    const docRef = await firebaseGet.getFirebaseDoc<T>({
      docReferenceParams: {
        path: docReferenceParams.path,
        pathSegments: docReferenceParams.pathSegments ?? undefined,
      },
    });

    if (!docRef) {
      throw new Error("No doc found");
    }

    const collectionRef = collection(docRef as any, collectionName);

    await addDoc(collectionRef, {});
  } catch (error) {
    throw new Error("An error occured");
  }
};

export const firebaseCreate = {
  setDocInCollection,
  addDocInCollection,
  setCollectionInDoc,
};
