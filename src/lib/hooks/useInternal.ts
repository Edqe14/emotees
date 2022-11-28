import { ReactNode } from 'react';
import create from 'zustand';
import { combine } from 'zustand/middleware';

const useInternal = create(
  combine({
    pasteLock: false,
    shortcutLock: false,

    scrollPosition: 0,
    searchQuery: '',

    showContextMenu: false,
    contextMenuPosition: [0, 0],
    contextMenuItems: null as ReactNode | null,
  }, (set) => ({
    setPasteLock: (pasteLock: boolean) => set({ pasteLock }),
    setShortcutLock: (shortcutLock: boolean) => set({ shortcutLock }),
    setScrollPosition: (scrollPosition: number) => set({ scrollPosition }),
    setSearchQuery: (searchQuery: string) => set({ searchQuery }),
    setShowContextMenu: (showContextMenu: boolean) => set({ showContextMenu }),
    setContextMenuPosition: (contextMenuPosition: [number, number]) => set({ contextMenuPosition }),
    setContextMenuItems: (contextMenuItems: ReactNode | null) => set({ contextMenuItems }),
  }))
);

export default useInternal;