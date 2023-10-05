import { getAuth, updateProfile } from "firebase/auth";

export const updateUserProfile = async ({
  params,
}: {
  params: { displayName?: string; photoURL?: string };
}) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User not found.");
  }

  await updateProfile(currentUser, {
    displayName: params.displayName || currentUser.displayName,
    photoURL: params.photoURL || currentUser.photoURL,
  });
};
