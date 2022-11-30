import { useHotkeys } from '@mantine/hooks';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import shallow from 'zustand/shallow';
import ContextMenu from './components/ContextMenu';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import { loadConfigFromFirebase, loadConfigFromStorage } from './lib/hooks/useConfig';
import { loadEmotesFromFirebase, loadEmotesFromStorage } from './lib/hooks/useEmotes';
import useTheme from './lib/hooks/useTheme';
import useUser from './lib/hooks/useUser';
import Index from './pages/Index';

export default function App() {
  const { toggleTheme } = useTheme();
  const [uid, loading] = useUser((s) => [s.uid, s.loading], shallow);
  const location = useLocation();

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

      <Navbar className="fixed top-0 right-0 left-0 p-8 w-full lg:w-3/5 md:w-5/6 mx-auto bg-slate-50 dark:bg-gray-900" />

      <AnimatePresence>
        {location.pathname === '/' && <Toolbar />}
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Index />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
