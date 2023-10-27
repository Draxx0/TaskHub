import { User, getAuth, updateProfile } from "firebase/auth";

export const updateUserProfile = async ({
  params,
}: {
  params: { displayName?: string; photoURL?: string };
}): Promise<User> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  console.log(currentUser);
  console.log(params);
  if (!currentUser) {
    throw new Error("User not found.");
  }

  console.log(currentUser);

  await updateProfile(currentUser, {
    displayName: params.displayName || currentUser.displayName,
    photoURL: params.photoURL || currentUser.photoURL,
  });

  return currentUser;
};
