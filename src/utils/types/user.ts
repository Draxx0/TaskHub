export interface IAvatar {
  avatar_name: string;
  url: string;
  fallback: string;
  width: "w-4" | "w-8" | "w-12";
}

export interface FirestoreUser {
  id: string;
  displayName: string;
  email: string;
  lastLogin: string;
  photoURL: string;
}
