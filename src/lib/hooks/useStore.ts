import { onValue, ref } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { useEffect, useState } from 'react';
import database from '../helpers/firebase/database';
import storage from '../helpers/firebase/storage';
import Emote from '../structs/Emote';

export interface StoreItem {
  id: string;
  name: string;
  thumbnail: string;
  content: Emote[] | (() => Promise<Emote[]>);
  thumbUrl?: string;
}

export default function useStore() {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storeRef = ref(database, 'store');
    const unsub = onValue(storeRef, async (snapshot) => {
      setLoading(true);

      const val = snapshot.val() ?? {};
      const data = Object.values(val) as StoreItem[];
      const mapped = await Promise.all(data.map(async (item) => ({
        ...item,
        thumbUrl: await getDownloadURL(storageRef(storage, `thumbnails/${item.thumbnail}`))
      })));

      setItems(mapped);
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  return {
    items,
    loading
  };
}