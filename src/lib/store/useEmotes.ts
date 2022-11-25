import create from 'zustand';
import { combine } from 'zustand/middleware';
import Emote from '../structs/Emote';

const useEmotes = create(
  combine({
    emotes: [] as Emote[],
  }, (set) => ({
    setEmotes: (emotes: Emote[]) => set({ emotes }),
  }))
);

export const loadEmotesFromStorage = () => {
  const emotes = localStorage.getItem('emotes');

  try {
    if (emotes) {
      const parsed = JSON.parse(emotes);

      useEmotes.setState({ emotes: parsed.map((emote: Emote) => new Emote(emote)) });

      return true;
    }
  } catch {
    return false;
  }

  return false;
};

export default useEmotes;