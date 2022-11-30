import { useWindowEvent } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useEffect, useLayoutEffect, useMemo } from 'react';
import shallow from 'zustand/shallow';

import { logEvent } from 'firebase/analytics';
import isURL from '@/lib/helpers/isURL';
import isDiscordEmojiURL from '@/lib/helpers/isDiscordEmojiURL';
import applyCustomNotificationOptions from '@/lib/helpers/applyCustomNotification';
import startNewEmojiFlow from '@/lib/helpers/startNewEmojiFlow';
import useEmotes from '@/lib/hooks/useEmotes';
import useInternal from '@/lib/hooks/useInternal';
import useConfig, { AutoSort } from '@/lib/hooks/useConfig';
import useUser from '@/lib/hooks/useUser';
import analytics from '@/lib/helpers/firebase/analytics';
import EmoteView from '@/components/EmoteView';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import Twemoji from '@/components/Twemoji';

export default function Index() {
  const [onlyShowFavorites, autoSort] = useConfig((s) => [s.onlyShowFavorites, s.autoSort], shallow);
  const userLoading = useUser((s) => s.loading);
  const [emotes, loading] = useEmotes((s) => [s.emotes, s.loading], shallow);
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

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_title: document.title,
      page_path: window.location.pathname,
    });
  }, []);

  const prepedEmote = useMemo(() => emotes
    .filter((e) => onlyShowFavorites ? e.favorite : true)
    .filter((e) => searchTerm ? e.name.includes(searchTerm) : true)
    .sort((a, b) => {
      if (autoSort === AutoSort.NAME_REVERSE) return b.name.localeCompare(a.name);
      if (autoSort === AutoSort.FAVORITE) return Number(b.favorite) - Number(a.favorite);
      if (autoSort === AutoSort.USES) return b.totalUses - a.totalUses;
      if (autoSort === AutoSort.TIME) return b.addedAt - a.addedAt;
      if (autoSort === AutoSort.TIME_REVERSE) return a.addedAt - b.addedAt;

      return a.name.localeCompare(b.name);
    })
    .map((emote) => (
      <EmoteView key={emote.name} {...emote} />
    )), [searchTerm, emotes, onlyShowFavorites, autoSort]);

  return (
    <Layout>
      <section className="my-20">
        {onlyShowFavorites && <h2 className="mb-3 font-bold text-lg italic text-center">Favorites only</h2>}

        <section className="flex flex-wrap gap-2 justify-center">
          {!loading && !userLoading && prepedEmote}

          {!prepedEmote.length && !userLoading && !loading && <NotFound />}
          {!prepedEmote.length && (userLoading || loading) && <Loading />}
        </section>
      </section>
    </Layout>
  );
}