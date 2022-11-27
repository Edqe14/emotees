import create from 'zustand';
import { combine } from 'zustand/middleware';

const useInternal = create(
  combine({
    pasteLock: false,
    shortcutLock: false,

    scrollPosition: 0,
    searchQuery: '',
  }, (set) => ({
    setPasteLock: (pasteLock: boolean) => set({ pasteLock }),
    setShortcutLock: (shortcutLock: boolean) => set({ shortcutLock }),
    setScrollPosition: (scrollPosition: number) => set({ scrollPosition }),
    setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  }))
);

export default useInternal;