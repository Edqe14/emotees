import { createEmotionCache, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
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
      withGlobalStyles
      theme={{
        colorScheme: theme,
        fontFamily: 'Cabin, sans-serif',
      }}
    >
      <ModalsProvider modalProps={{ zIndex: 350 }}>
        <NotificationsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />
);
