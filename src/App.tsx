import { useHotkeys } from '@mantine/hooks';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ContextMenu from './components/ContextMenu';
import { loadConfigFromStorage } from './lib/hooks/useConfig';
import { loadEmotesFromStorage } from './lib/hooks/useEmotes';
import useTheme from './lib/hooks/useTheme';

import Index from './pages/Index';

export default function App() {
  const { toggleTheme } = useTheme();

  useHotkeys([
    ['mod+J', () => toggleTheme()],
  ]);

  useEffect(() => {
    const config = loadConfigFromStorage();

    if (config) {
      // TODO: firebase integration
      // if (config.useFirebase)

      loadEmotesFromStorage();
    }
  }, []);

  return (
    <>
      <ContextMenu />

      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </>
  );
}
