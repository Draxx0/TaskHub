import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase.config";

export const uploadImageInBucket = async (
  file: File | null
): Promise<string | undefined> => {
  if (!file) {
    throw new Error("No file provided");
  }

  const storageRef = ref(storage, `images/${file.name}`);

  try {
    const uploadResult: UploadResult = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(uploadResult.ref);

    return url;
  } catch (error) {
    console.error("Erreur lors de l'envoi du fichier :", error);
    throw new Error("An error occured during uploading");
  }
};
