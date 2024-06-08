import { storage } from "@/config/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  StorageError,
} from "firebase/storage";

const uploadImage = async (file: File): Promise<string> => {
  const date = new Date();
  const storageRef = ref(storage, `images/${file.name + date.toISOString()}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error: StorageError) => {
        reject(`Something went wrong! ${error.code}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default uploadImage;
