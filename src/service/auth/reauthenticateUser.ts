import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";

export const reauthenticateUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("User not found");
    }

    const credential = EmailAuthProvider.credential(
      credentials.email,
      credentials.password
    );

    await reauthenticateWithCredential(currentUser, credential);
  } catch (error) {
    console.error("Error reauthenticating:", error);
    throw new Error("An error occured");
  }
};
