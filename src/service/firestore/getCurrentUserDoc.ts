import { firebaseGet } from "../firebaseGet";

export const getCurrentUserDoc = async <T>(userId: string) => {
  return await firebaseGet.getFirebaseDoc<T>({
    docReferenceParams: {
      path: "users",
      pathSegments: [userId],
    },
  });
};
