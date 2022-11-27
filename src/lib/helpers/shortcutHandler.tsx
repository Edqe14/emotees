import useInternal from '../hooks/useInternal';

export default function shortcutHandler(handler: () => void) {
  return () => {
    if (useInternal.getState().shortcutLock) return;

    return handler();
  };
}