import { firebaseGet } from "../firebaseGet";

export const getCurrentUserDoc = async <T>(userId: string) => {
  return await firebaseGet.getFirebaseDoc<T>({
    docReference: {
      path: "users",
      pathSegments: [userId],
    },
  });
};
