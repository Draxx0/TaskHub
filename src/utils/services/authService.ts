import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../service/firebase.config";
import { updateUserProfile } from "../../service/functions/updateUserProfile";
import { firebaseCreate } from "@/service/firebaseCreate";

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

  await firebaseCreate.setDocInCollection<{
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    lastLogin?: string;
  }>({
    docReference: {
      path: "users",
      pathSegments: [userCreated.user.uid],
    },
    data: {
      displayName: userCreated.user.displayName || "",
      email: userCreated.user.email || "",
      photoURL: userCreated.user.photoURL || "",
      lastLogin: userCreated.user.metadata.lastSignInTime || "",
    },
  });

  await sendEmailVerification(userCreated.user);

  return userCreated;
};

const authService = {
  authenticate,
};

export default authService;
