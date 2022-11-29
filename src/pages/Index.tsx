import { useWindowEvent } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { lazy, Suspense, useLayoutEffect, useMemo } from 'react';
import shallow from 'zustand/shallow';

import isURL from '@/lib/helpers/isURL';
import isDiscordEmojiURL from '@/lib/helpers/isDiscordEmojiURL';
import applyCustomNotificationOptions from '@/lib/helpers/applyCustomNotification';
import startNewEmojiFlow from '@/lib/helpers/startNewEmojiFlow';
import useEmotes from '@/lib/hooks/useEmotes';
import useInternal from '@/lib/hooks/useInternal';
import useConfig, { AutoSort } from '@/lib/hooks/useConfig';
import useUser from '@/lib/hooks/useUser';

const Layout = lazy(() => import('@/components/Layout'));
const Navbar = lazy(() => import('@/components/Navbar'));
const Loading = lazy(() => import('@/components/Loading'));
const NotFound = lazy(() => import('@/components/NotFound'));
const Toolbar = lazy(() => import('@/components/Toolbar'));
const EmoteView = lazy(() => import('@/components/EmoteView'));
const Twemoji = lazy(() => import('@/components/Twemoji'));

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
    <Suspense>
      <Layout>
        <Navbar className="fixed top-0 right-0 left-0 p-8 w-full lg:w-3/5 md:w-5/6 mx-auto bg-slate-50 dark:bg-gray-900" />

        <section className="my-20">
          {onlyShowFavorites && <h2 className="mb-3 font-bold text-lg italic text-center">Favorites only</h2>}

          <Suspense>
            <section className="flex flex-wrap gap-2 justify-center">
              {!loading && !userLoading && prepedEmote}

              {!prepedEmote.length && !userLoading && !loading && <NotFound />}
              {!prepedEmote.length && userLoading && loading && <Loading />}
            </section>
          </Suspense>
        </section>
        <Toolbar />
      </Layout>
    </Suspense>
  );
}