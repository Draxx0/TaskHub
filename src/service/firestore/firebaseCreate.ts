import { db } from "@/service/firebase.config";
import {
  FirebaseCreateCollectionInDoc,
  FirebaseCreateDoc,
} from "@/utils/types/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { parseDataForFirebase } from "../utils/parseDataForFirebase";
import { firebaseGet } from "./firebaseGet";
import { Workshop } from "@/utils/types/workshop";

const setDocInCollection = async <T>({
  docReference,
  data,
}: FirebaseCreateDoc<T>) => {
  const docRef = doc(
    db,
    docReference.path,
    ...(docReference.pathSegments ?? [])
  );
  try {
    await setDoc(docRef, parseDataForFirebase(data), { merge: true });
  } catch (error) {
    throw new Error("An error occured");
  }
};

const addDocInCollection = async <T, K = unknown>({
  docReference,
  data,
  returnOptions,
}: FirebaseCreateDoc<T>): Promise<K | undefined | void> => {
  const collectionRef = collection(
    db,
    docReference.path,
    ...(docReference.pathSegments ?? [])
  );

  const dataWithDate = {
    ...data,
    createdAt: Timestamp.fromDate(new Date()),
  };

  try {
    if (returnOptions?.returnData) {
      try {
        const newDocRef = await addDoc(
          collectionRef,
          parseDataForFirebase(dataWithDate)
        );
        const newDocSnap = await getDoc(newDocRef);
        if (newDocSnap.exists()) {
          return {
            ...newDocSnap.data(),
            id: newDocSnap.id,
          };
        }
      } catch (error) {
        throw new Error("An error occured");
      }
    }

    await addDoc(collectionRef, parseDataForFirebase(dataWithDate));
  } catch (error) {
    throw new Error("An error occured");
  }
};

const setCollectionInDoc = async <T, K>({
  docReference,
  collectionName,
  newCollectionFirstDoc,
}: FirebaseCreateCollectionInDoc<K>) => {
  try {
    const docRef = (await firebaseGet.getFirebaseDoc<T>({
      docReference: {
        path: docReference.path,
        pathSegments: docReference.pathSegments ?? undefined,
      },
    })) as Workshop | undefined;

    if (!docRef) {
      throw new Error("No doc found");
    }

    console.log("DOC REFFF", docRef);

    const collectionRef = collection(
      db,
      docReference.path,
      docRef.id,
      collectionName
    );

    console.log("Collection REF", collectionRef);

    await addDoc(collectionRef, newCollectionFirstDoc ?? {});
  } catch (error) {
    throw new Error("An error occured");
  }
};

export const firebaseCreate = {
  setDocInCollection,
  addDocInCollection,
  setCollectionInDoc,
};
