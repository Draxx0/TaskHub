import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "./firebase.config";
import { getFirebaseCollection, getFirebaseDoc } from "../utils/types/firebase";

const getFirebaseDoc = async <T>({
  docReference,
}: getFirebaseDoc): Promise<T | undefined> => {
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
}: getFirebaseCollection): Promise<T[] | undefined> => {
  const collectionRef = collection(db, params.path);

  try {
    const collectionSnap = await getDocs(collectionRef).then(
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

const firebaseService = {
  getFirebaseDoc,
  getFirebaseCollection,
};

export default firebaseService;
