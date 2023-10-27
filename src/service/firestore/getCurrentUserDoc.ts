import { firebaseGet } from "./firebaseGet";

//! Is this real usefull ?
export const getCurrentUserDoc = async <T>(userId: string) => {
  return await firebaseGet.getFirebaseDoc<T>({
    docReference: {
      path: "users",
      pathSegments: [userId],
    },
  });
};
