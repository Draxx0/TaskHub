import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { FirebaseUpdateDoc } from "@/utils/types/firebase";
import { parseDataForFirebase } from "../utils/parseDataForFirebase";

const docInCollection = async <T>({
  docReference,
  updateData,
}: FirebaseUpdateDoc<T>) => {
  try {
    const docRef = doc(
      db,
      docReference.path,
      ...(docReference.pathSegments ? docReference.pathSegments : [])
    );

    const toot = await getDoc(docRef);

    console.log("doc ref", toot.data());

    await updateDoc(docRef, parseDataForFirebase(updateData));
  } catch (error) {
    throw new Error("An error occured");
  }
};

export const firebaseUpdate = {
  docInCollection,
};
