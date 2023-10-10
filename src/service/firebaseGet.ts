import {
  doc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { FirebaseCollection, FirebaseDoc } from "../utils/types/firebase";

const getFirebaseDoc = async <T>({
  docReference,
}: FirebaseDoc): Promise<T | undefined> => {
  const docRef = doc(
    db,
    docReference.path,
    ...(docReference.pathSegments ?? [])
  );

  try {
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    const data = docSnap.data() as T;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getFirebaseCollection = async <T>({
  params,
  condition,
}: FirebaseCollection): Promise<T[] | undefined> => {
  const collectionRef = collection(db, params.path);

  const q = condition
    ? query(
        collectionRef,
        where(
          condition.leftConditon,
          condition.operator,
          condition.rightCondition
        )
      )
    : null;

  try {
    const collectionSnap = await getDocs(q ?? collectionRef).then(
      (querySnapshot) => {
        const state: Array<T> = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          state.push({ ...doc.data(), id: doc.id } as T);
        });
        return state;
      }
    );
    return collectionSnap;
  } catch (error) {
    console.log(error);
  }
};

export const firebaseGet = {
  getFirebaseDoc,
  getFirebaseCollection,
};
