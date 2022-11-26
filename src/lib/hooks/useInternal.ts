import create from 'zustand';
import { combine } from 'zustand/middleware';

const useInternal = create(
  combine({
    pasteLock: false,
    scrollPosition: 0
  }, (set) => ({
    setPasteLock: (pasteLock: boolean) => set({ pasteLock }),
    setScrollPosition: (scrollPosition: number) => set({ scrollPosition })
  }))
);

export default useInternal;