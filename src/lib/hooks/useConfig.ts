import { pick } from 'lodash-es';
import create from 'zustand';
import { combine } from 'zustand/middleware';
import { subscribeToUserConfigData, writeUserConfigData } from '../helpers/firebase/database';
import useUser from './useUser';

// eslint-disable-next-line no-shadow
export enum AutoSort {
  NAME = 0,
  NAME_REVERSE = 1,
  FAVORITE = 2,
  USES = 3,
  TIME = 4,
  TIME_REVERSE = 5
}

export type Config = {
  onlyShowFavorites: boolean;
  namePrefix: string;
  autoSort: AutoSort;
};

export const DEFAULT_CONFIG: Config = {
  onlyShowFavorites: false,
  namePrefix: '',
  autoSort: AutoSort.FAVORITE,
};

const useConfig = create(
  combine(DEFAULT_CONFIG, (set) => ({
    setOnlyShowFavorites: (onlyShowFavorites: boolean) => set({ onlyShowFavorites }),
    setNamePrefix: (namePrefix: string) => set({ namePrefix }),
    setAutoSort: (autoSort: AutoSort) => set({ autoSort }),
  }))
);

useConfig.subscribe((config) => {
  const user = useUser.getState();
  if (user.loading) return;
  if (!user.uid) return localStorage.setItem('config', JSON.stringify(config));

  // Firebase
  writeUserConfigData(user.uid, pick(config, Object.keys(DEFAULT_CONFIG)) as Config);
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

export const loadConfigFromFirebase = (userId: string) => subscribeToUserConfigData(userId, (data) => useConfig.setState(data));

export default useConfig;