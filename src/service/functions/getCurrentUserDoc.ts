import { FirestoreUser } from "@/utils/types/user";
import { firebaseGet } from "../firebaseGet";

export const getCurrentUserDoc = async (userId: string) => {
  return await firebaseGet.getFirebaseDoc<FirestoreUser>({
    docReference: {
      path: "users",
      pathSegments: [userId],
    },
  });
};
