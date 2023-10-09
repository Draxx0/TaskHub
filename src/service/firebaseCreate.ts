import { db } from "@/service/firebase.config";
import { FirebaseCreateDoc } from "@/utils/types/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { parseDataForFirebase } from "./functions/parseDataForFirebase";

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
    await setDoc(docRef, parseDataForFirebase(data));
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
  try {
    await addDoc(collectionRef, parseDataForFirebase(data));
  } catch (error) {
    throw new Error("An error occured");
  }
};

export const firebaseCreate = {
  setDocInCollection,
  addDocInCollection,
};
