import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../service/firebase.config";
import { updateUserProfile } from "../functions/updateUserProfile";

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
  return userCreated;
};

const authService = {
  authenticate,
};

export default authService;
