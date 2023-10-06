import { User, getAuth, updateEmail } from "firebase/auth";

export const updateUserEmail = async (newEmail: string): Promise<User> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User not found");
  } else if (!newEmail) {
    throw new Error("new email is empty");
  }

  await updateEmail(currentUser, newEmail);

  return currentUser;
};
