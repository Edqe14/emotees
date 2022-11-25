import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>({ key: 'theme', defaultValue: 'dark' });
  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return {
    theme,
    setTheme,
    toggleTheme
  };
}