import { createEmotionCache, MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import useTheme from './lib/hooks/useTheme';

const cache = createEmotionCache({
  key: 'mantine',
  prepend: false,
});

const Root = () => {
  const { theme } = useTheme();

  return (
    <MantineProvider
      emotionCache={cache}
      withCSSVariables
      theme={{
        colorScheme: theme
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />
);
