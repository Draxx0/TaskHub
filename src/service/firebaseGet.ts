import {
  doc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase.config";
import {
  FirebaseCollection,
  FirebaseDocData,
  FirebaseGetDoc,
} from "../utils/types/firebase";

const getFirebaseDoc = async <T>({
  docReferenceParams,
  returnWithId,
}: FirebaseGetDoc): Promise<
  FirebaseDocData<T> | Omit<FirebaseDocData<T>, "id"> | undefined
> => {
  const docRef = doc(
    db,
    docReferenceParams.path,
    ...(docReferenceParams.pathSegments ?? [])
  );

  try {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as T;
    if (returnWithId) {
      return {
        ...data,
        id: docSnap.id,
      } as FirebaseDocData<T>;
    }
    return data as Omit<FirebaseDocData<T>, "id">;
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
