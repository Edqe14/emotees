import { useWindowEvent } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useLayoutEffect, useMemo } from 'react';

import Layout from '@/components/Layout';
import isURL from '@/lib/helpers/isURL';
import isDiscordEmojiURL from '@/lib/helpers/isDiscordEmojiURL';
import applyCustomNotificationOptions from '@/lib/helpers/applyCustomNotification';
import Twemoji from '@/components/Twemoji';
import startNewEmojiFlow from '@/lib/helpers/startNewEmojiFlow';
import useEmotes from '@/lib/hooks/useEmotes';
import Navbar from '@/components/Navbar';
import useInternal from '@/lib/hooks/useInternal';
import EmoteView from '@/components/EmoteView';
import Toolbar from '@/components/Toolbar';

import animeSad from '@/assets/notfound.png';
import useConfig from '@/lib/hooks/useConfig';

export default function Index() {
  const onlyShowFavorites = useConfig((s) => s.onlyShowFavorites);
  const emotes = useEmotes((s) => s.emotes);
  const searchTerm = useInternal((s) => s.searchQuery);

  useWindowEvent('paste', (ev) => {
    const e = ev as unknown as ClipboardEvent;

    if (!useInternal.getState().pasteLock) {
      e.preventDefault();
      e.stopPropagation();

      const text = e.clipboardData?.getData('text');
      if (text && isURL(text)) {
        if (isDiscordEmojiURL(text)) {
          startNewEmojiFlow(text);

          return;
        }

        showNotification(applyCustomNotificationOptions({
          id: 'paste-unsupported-url',
          title: 'Unsupported URL',
          message: (
            <Twemoji>Hey! Sorry for the inconvenience, but we currently only support Discord emoji URLs only 😔</Twemoji>
          ),
          color: 'red',
        }));
      }
    }
  });

  useLayoutEffect(() => {
    window.scrollTo(0, useInternal.getState().scrollPosition);
  }, [emotes]);

  const prepedEmote = useMemo(() => emotes
    .filter((e) => onlyShowFavorites ? e.favorite : true)
    .filter((e) => searchTerm ? e.name.includes(searchTerm) : true)
    .sort((a, b) => b.totalUses - a.totalUses)
    .map((emote) => (
      <EmoteView key={emote.name} {...emote} />
    )), [searchTerm, emotes, onlyShowFavorites]);

  return (
    <Layout>
      <Navbar className="fixed top-0 right-0 left-0 p-8 w-full lg:w-3/5 md:w-5/6 mx-auto bg-slate-50 dark:bg-gray-900" />

      <section className="py-20 flex flex-wrap gap-2 justify-center">
        {prepedEmote}
        {!prepedEmote.length && (
          <section className="py-2">
            <img src={animeSad} alt="sad anime girl" className="w-48 mb-4" />

            <h2 className="text-lg font-medium italic">oh nyo! can&apos;t find anything</h2>
          </section>
        )}
      </section>
      <Toolbar />
    </Layout>
  );
}