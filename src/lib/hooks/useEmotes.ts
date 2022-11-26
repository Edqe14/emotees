import create from 'zustand';
import { combine } from 'zustand/middleware';
import Emote from '../structs/Emote';

const useEmotes = create(
  combine({
    emotes: [] as Emote[],
  }, (set) => ({
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

useEmotes.subscribe((emotes) => {
  localStorage.setItem('emotes', JSON.stringify(emotes.emotes));
});

export const loadEmotesFromStorage = () => {
  const emotes = localStorage.getItem('emotes');

  try {
    if (emotes) {
      const parsed = JSON.parse(emotes) as Emote[];

      useEmotes.setState({ emotes: parsed });

      return parsed;
    }

    localStorage.setItem('emotes', JSON.stringify(useEmotes.getState().emotes));

    return useEmotes.getState().emotes;
  } catch {
    return false;
  }

};

export default useEmotes;