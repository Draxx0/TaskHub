import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../service/firebase.config";
import { updateUserProfile } from "../functions/updateUserProfile";
import { firebaseSet } from "@/service/firebaseSet";

const authenticate = async (
  type: "signup" | "login",
  data: { email: string; password: string; profile?: string }
) => {
  if (type === "login") {
    return await signInWithEmailAndPassword(auth, data.email, data.password);
  }

  const userCreated = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  await updateUserProfile({
    params: {
      photoURL: data.profile,
    },
  });
  await firebaseSet.docInCollection<{
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    lastLogin?: string;
  }>({
    collection: "users",
    userUid: userCreated.user.uid,
    data: {
      displayName: userCreated.user.displayName || "",
      email: userCreated.user.email || "",
      photoURL: userCreated.user.photoURL || "",
      lastLogin: userCreated.user.metadata.lastSignInTime || "",
    },
  });
  return userCreated;
};

const authService = {
  authenticate,
};

export default authService;
