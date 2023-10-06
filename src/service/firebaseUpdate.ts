import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.config";

const docInCollection = async <T>({
  collection,
  docId,
  updateData,
}: {
  collection: string;
  docId: string;
  updateData: T;
}) => {
  try {
    const ref = doc(db, collection, docId);

    await updateDoc(ref, JSON.parse(JSON.stringify(updateData)));
  } catch (error) {
    throw new Error("An error occured");
  }
};

export const firebaseUpdate = {
  docInCollection,
};
