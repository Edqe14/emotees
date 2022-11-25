import create from 'zustand';
import { combine } from 'zustand/middleware';

type Config = {
  onlyShowFavorites: boolean;
  namePrefix: string;
  useFirebase: boolean;
};

const useConfig = create(
  combine({
    onlyShowFavorites: false,
    namePrefix: '',
    useFirebase: false,
  }, (set) => ({
    setOnlyShowFavorites: (onlyShowFavorites: boolean) => set({ onlyShowFavorites }),
    setNamePrefix: (namePrefix: string) => set({ namePrefix }),
    setUseFirebase: (useFirebase: boolean) => set({ useFirebase }),
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