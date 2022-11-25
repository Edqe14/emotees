import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { loadConfigFromStorage } from './lib/hooks/useConfig';
import { loadEmotesFromStorage } from './lib/hooks/useEmotes';

import Index from './pages/Index';

export default function App() {
  useEffect(() => {
    const config = loadConfigFromStorage();

    if (config) {
      // TODO: firebase integration
      // if (config.useFirebase)

      loadEmotesFromStorage();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  );
}
