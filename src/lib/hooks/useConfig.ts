import create from 'zustand';
import { combine } from 'zustand/middleware';

export type Config = {
  onlyShowFavorites: boolean;
  namePrefix: string;
  useFirebase: boolean;
};

// eslint-disable-next-line no-shadow
export enum AutoSort {
  NAME = 0,
  NAME_REVERSE = 1,
  FAVORITE = 2,
  USES = 3,
  TIME = 4,
  TIME_REVERSE = 5
}

const useConfig = create(
  combine({
    onlyShowFavorites: false,
    namePrefix: '',
    useFirebase: false,
    autoSort: AutoSort.FAVORITE,
  }, (set) => ({
    setOnlyShowFavorites: (onlyShowFavorites: boolean) => set({ onlyShowFavorites }),
    setNamePrefix: (namePrefix: string) => set({ namePrefix }),
    setUseFirebase: (useFirebase: boolean) => set({ useFirebase }),
    setAutoSort: (autoSort: AutoSort) => set({ autoSort }),
  }))
);

useConfig.subscribe((config) => {
  localStorage.setItem('config', JSON.stringify(config));
});

export const loadConfigFromStorage = () => {
  const config = localStorage.getItem('config');

  try {
    if (config) {
      const parsed = JSON.parse(config) as Config;

      useConfig.setState(parsed);

      return parsed;
    }

    localStorage.setItem('config', JSON.stringify(useConfig.getState()));

    return useConfig.getState();
  } catch {
    return false;
  }

};

export default useConfig;