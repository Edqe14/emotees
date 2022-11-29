import { getDatabase, onValue, ref, set } from 'firebase/database';
import Emote from '@/lib/structs/Emote';
import app from '.';
import { Config, DEFAULT_CONFIG } from '@/lib/hooks/useConfig';

const database = getDatabase(app);

export default database;

export const writeUserConfigData = (userId: string, data: Config) => set(ref(database, `users/${userId}/config`), data);
export const writeUserEmoteData = (userId: string, data: Emote[]) => set(ref(database, `users/${userId}/emotes`), data);

export const subscribeToUserEmoteData = (userId: string, handler: (data: Emote[]) => void) => {
  const reference = ref(database, `users/${userId}/emotes`);
  const unsub = onValue(reference, (snapshot) => {
    const data = snapshot.val() ?? [] as Emote[];

    handler(data);
  });

  return unsub;
};

export const subscribeToUserConfigData = (userId: string, handler: (data: Config) => void) => {
  const reference = ref(database, `users/${userId}/config`);
  const unsub = onValue(reference, (snapshot) => {
    const data = snapshot.val() as Config ?? DEFAULT_CONFIG;

    handler(data);
  });

  return unsub;
};