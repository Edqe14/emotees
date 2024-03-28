import { useWindowEvent } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useEffect, useLayoutEffect, useMemo } from 'react';
import shallow from 'zustand/shallow';

import { logEvent } from 'firebase/analytics';
import InfiniteScroll from 'react-infinite-scroll-component';
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
import useChunked from '@/lib/hooks/useChunked';

export default function Index() {
  const [onlyShowFavorites, autoSort] = useConfig((s) => [s.onlyShowFavorites, s.autoSort], shallow);
  const userLoading = useUser((s) => s.loading);
  const [loading, searchEngine] = useEmotes((s) => [s.loading, s.searchEngine], shallow);
  const emotes = useEmotes((s) => s.emotes, (a, b) => JSON.stringify(a.map(({ totalUses, ...v }) => v)) === JSON.stringify(b.map(({ totalUses, ...v }) => v)));
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
      page_title: 'home',
      page_path: '/',
    });
  }, []);

  const mappedEmotes = useMemo(() => emotes.map((e) => [e, <EmoteView key={e.file} {...e} />] as const), [emotes]);
  const onlyFavorites = useMemo(() => mappedEmotes.filter(([e]) => onlyShowFavorites ? e.favorite : true), [mappedEmotes, onlyShowFavorites]);
  const filteredEmotes = useMemo(() => {
    if (!searchTerm) return onlyFavorites;

    const result = searchEngine.search(searchTerm);

    return onlyFavorites.filter(([e]) => result.some((r) => r.id === e.file));
  }, [searchTerm, onlyFavorites]);
  const sortedEmotes = useMemo(() => filteredEmotes
    .toSorted(([a], [b]) => {
      if (autoSort === AutoSort.NAME_REVERSE) return b.name.localeCompare(a.name);
      if (autoSort === AutoSort.FAVORITE) return Number(b.favorite) - Number(a.favorite);
      if (autoSort === AutoSort.USES) return b.totalUses - a.totalUses;
      if (autoSort === AutoSort.TIME) return b.addedAt - a.addedAt;
      if (autoSort === AutoSort.TIME_REVERSE) return a.addedAt - b.addedAt;

      return a.name.localeCompare(b.name);
    }), [filteredEmotes, autoSort]);
  const elements = useMemo(() => sortedEmotes.map(([, element]) => element), [sortedEmotes]);
  const [paginatedElements, hasNext, next] = useChunked(elements, 80);

  useEffect(() => {
    if (loading || userLoading) return;

    const run = async () => {
      const result = next();

      if (!result.done || document.body.clientHeight < window.innerHeight) next();
    };

    run();
  }, [next, loading, userLoading]);

  return (
    <Layout>
      {onlyShowFavorites && <h2 className="mb-3 font-bold text-lg italic text-center">Favorites only</h2>}
      {searchTerm && !!sortedEmotes.length && <h2 className="mb-3 font-bold text-lg italic text-center">Search results ({sortedEmotes.length})</h2>}

      <section>
        {!loading && !userLoading && !!sortedEmotes.length && (
          <InfiniteScroll
            dataLength={paginatedElements.length}
            next={next}
            hasMore={hasNext}
            loader={<Loading />}
            className="flex flex-wrap gap-2 justify-center w-full"
          >
            {paginatedElements}
          </InfiniteScroll>
        )}

        {!sortedEmotes.length && !userLoading && !loading && <NotFound />}
        {!sortedEmotes.length && (userLoading || loading) && <Loading />}
      </section>
    </Layout>
  );
}