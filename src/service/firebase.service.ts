import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "./firebase.config";
import { getFirebaseDocData } from "../utils/types/firebase";

const getFirebaseDoc = async ({ docReference }: getFirebaseDocData) => {
  const docRef = doc(
    db,
    docReference.path,
    ...(docReference.pathSegments ?? [])
  );

  try {
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
  } catch (error) {
    console.log(error);
  }
};

const getFirebaseCollection = async (params: { collection: string }) => {
  const collectionRef = collection(db, params.collection);

  try {
    await getDocs(collectionRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const firebaseService = {
  getFirebaseDoc,
  getFirebaseCollection,
};

export default firebaseService;
