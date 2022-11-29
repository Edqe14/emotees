import { useHotkeys } from '@mantine/hooks';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import shallow from 'zustand/shallow';
import ContextMenu from './components/ContextMenu';
import { loadConfigFromFirebase, loadConfigFromStorage } from './lib/hooks/useConfig';
import { loadEmotesFromFirebase, loadEmotesFromStorage } from './lib/hooks/useEmotes';
import useTheme from './lib/hooks/useTheme';
import useUser from './lib/hooks/useUser';

import Index from './pages/Index';

export default function App() {
  const { toggleTheme } = useTheme();
  const [uid, loading] = useUser((s) => [s.uid, s.loading], shallow);

  useHotkeys([
    ['mod+J', () => toggleTheme()],
  ]);

  useEffect(() => {
    if (loading) return;

    // Use firebase
    if (uid) {
      const unsubEmote = loadEmotesFromFirebase(uid);
      const unsubConfig = loadConfigFromFirebase(uid);

      return () => {
        unsubEmote();
        unsubConfig();
      };
    }

    loadConfigFromStorage();
    loadEmotesFromStorage();
  }, [uid, loading]);

  return (
    <>
      <ContextMenu />

      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </>
  );
}
