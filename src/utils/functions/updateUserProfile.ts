import { User, getAuth, updateProfile } from "firebase/auth";

export const updateUserProfile = async ({
  params,
}: {
  params: { displayName?: string; photoURL?: string };
}): Promise<User> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (
    !currentUser ||
    currentUser.displayName === params.displayName ||
    currentUser.photoURL === params.photoURL
  ) {
    throw new Error("User not found.");
  }

  await updateProfile(currentUser, {
    displayName: params.displayName || currentUser.displayName,
    photoURL: params.photoURL || currentUser.photoURL,
  });

  return currentUser;
};
