import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../service/firebase.config";

const authenticate = async (
  type: "signup" | "login",
  data: { email: string; password: string }
) => {
  if (type === "login") {
    return await signInWithEmailAndPassword(auth, data.email, data.password);
  }

  return await createUserWithEmailAndPassword(auth, data.email, data.password);
};

const authService = {
  authenticate,
};

export default authService;
