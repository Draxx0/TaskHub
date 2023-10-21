import { db } from "@/service/firebase.config";
import { FirebaseCreateDoc } from "@/utils/types/firebase";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { parseDataForFirebase } from "./utils/parseDataForFirebase";

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

const addDocInCollection = async <T>({
  docReference,
  data,
}: FirebaseCreateDoc<T>) => {
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
    await addDoc(collectionRef, parseDataForFirebase(dataWithDate));
  } catch (error) {
    throw new Error("An error occured");
  }
};

export const firebaseCreate = {
  setDocInCollection,
  addDocInCollection,
};
