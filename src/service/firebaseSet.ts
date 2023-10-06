import { db } from "@/service/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const docInCollection = async <T>({
  collection,
  userUid,
  data,
}: {
  collection: string;
  userUid: string;
  data: T;
}) => {
  try {
    await setDoc(
      doc(db, collection, userUid),
      JSON.parse(JSON.stringify(data))
    );
  } catch (error) {
    throw new Error("An error occured");
  }
};

export const firebaseSet = {
  docInCollection,
};
