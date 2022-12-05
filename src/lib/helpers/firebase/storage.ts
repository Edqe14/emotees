import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import app from '.';

const storage = getStorage(app);

export default storage;

export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  return url;
};