import {
  doc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { FirebaseGet } from "../../utils/types/firebase";

type Props = {
  getSubCollectionData?: {
    path: string;
    pathSegments?: string[];
  };
};

const getFirebaseDoc = async <T>({
  docReference,
  condition,
  getSubCollectionData,
}: FirebaseGet & Props): Promise<T | undefined> => {
  const docRef = doc(
    db,
    docReference.path,
    ...(docReference.pathSegments ?? [])
  );

  // if subcollection is invoked
  if (getSubCollectionData && condition) {
    const subCollectionRef = collection(docRef, getSubCollectionData.path);
    console.log("there is condition & sub collection");
    const q = query(
      subCollectionRef,
      where(
        condition.leftConditon,
        condition.operator,
        condition.rightCondition
      )
    );

    const subCollectionSnap = await getDocs(q);

    if (!subCollectionSnap.empty) {
      const subCollectionDocSnap = subCollectionSnap.docs[0];
      console.log("snaps", subCollectionSnap.docs);
      return {
        ...(subCollectionDocSnap.data() as T),
        id: subCollectionDocSnap.id,
      };
    }
  }

  try {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as T;
    return {
      ...data,
      id: docSnap.id,
    };
  } catch (error) {
    console.log(error);
  }
};

const getFirebaseCollection = async <T>({
  docReference,
  condition,
}: FirebaseGet): Promise<T[] | undefined> => {
  const collectionRef = collection(
    db,
    docReference.path,
    ...(docReference.pathSegments ?? [])
  );

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
