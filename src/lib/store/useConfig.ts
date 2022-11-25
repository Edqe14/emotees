import create from 'zustand';
import { combine } from 'zustand/middleware';

const useConfig = create(
  combine({
    onlyShowFavorites: false,
    namePrefix: '',
  }, (set) => ({
    setOnlyShowFavorites: (onlyShowFavorites: boolean) => set({ onlyShowFavorites }),
    setNamePrefix: (namePrefix: string) => set({ namePrefix }),
  }))
);

export const loadConfigFromStorage = () => {
  const config = localStorage.getItem('config');

  try {
    if (config) {
      useConfig.setState(JSON.parse(config));

      return true;
    }
  } catch {
    return false;
  }

  return false;
};

export default useConfig;