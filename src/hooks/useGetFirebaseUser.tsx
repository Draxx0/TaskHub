import { getAuth } from "firebase/auth";

const useGetFirebaseUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not found");
  }

  return { user };
};

export default useGetFirebaseUser;
