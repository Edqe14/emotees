import create from 'zustand';
import { combine } from 'zustand/middleware';

const useInternal = create(
  combine({
    pasteLock: false,
  }, (set) => ({
    setPasteLock: (pasteLock: boolean) => set({ pasteLock }),
  }))
);

export default useInternal;