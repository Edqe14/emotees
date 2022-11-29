import create from 'zustand';
import { combine } from 'zustand/middleware';
import shallow from 'zustand/shallow';
import { subscribeToUserEmoteData, writeUserEmoteData } from '../helpers/firebase/database';
import Emote from '../structs/Emote';
import useUser from './useUser';

const useEmotes = create(
  combine({
    emotes: [] as Emote[],
    loading: true,
  }, (set) => ({
    setLoading: (loading: boolean) => set({ loading }),
    setEmotes: (emotes: Emote[]) => set({ emotes }),
    appendEmote: (emote: Emote) => set((state) => ({ emotes: [emote, ...state.emotes] })),
    removeEmote: (index: number) => set((state) => ({ emotes: state.emotes.filter((_, i) => i !== index) })),
    updateEmote: (index: number, data: Partial<Emote> | ((current: Emote) => Partial<Emote>)) => set((state) => {
      const emotes = [...state.emotes];
      const current = emotes[index];

      if (!current) return {};

      const merge = typeof data === 'function' ? data(current) : data;
      emotes[index] = { ...current, ...merge };

      return { emotes };
    })
  }))
);

useEmotes.subscribe(({ emotes }, { emotes: pastEmotes }) => {
  if (shallow(emotes, pastEmotes)) return;

  const user = useUser.getState();
  if (user.loading) return;
  if (!user.uid) return localStorage.setItem('emotes', JSON.stringify(emotes));

  // Firebase
  writeUserEmoteData(user.uid, emotes);
});

export const loadEmotesFromStorage = () => {
  useEmotes.setState({ loading: true });

  const emotes = localStorage.getItem('emotes');

  try {
    if (emotes) {
      const parsed = JSON.parse(emotes) as Emote[];

      useEmotes.setState({ emotes: parsed, loading: false });

      return parsed;
    }

    localStorage.setItem('emotes', JSON.stringify(useEmotes.getState().emotes));
    useEmotes.setState({ loading: false });

    return useEmotes.getState().emotes;
  } catch {
    useEmotes.setState({ loading: false });

    return false;
  }
};

export const loadEmotesFromFirebase = (userId: string) => subscribeToUserEmoteData(userId, (data) => useEmotes.setState({ emotes: data, loading: false }));

export default useEmotes;