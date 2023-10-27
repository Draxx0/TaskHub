import { FirebaseDoc } from "@/utils/types/firebase";
import { DocumentReference, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

const deleteDocInCollection = async ({
  docReference,
}: FirebaseDoc): Promise<void> => {
  try {
    await deleteDoc(
      doc(
        db,
        docReference.path,
        ...(docReference.pathSegments ? docReference.pathSegments : [])
      )
    );
  } catch (error) {
    throw new Error("An error occured during deletion");
  }
};

const deleteDocWithDocRef = async <T>(docRef: DocumentReference<T>) => {
  try {
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error("An error occured during deletion");
  }
};

export const firebaseDelete = {
  deleteDocInCollection,
  deleteDocWithDocRef,
};
