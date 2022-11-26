import { useWindowEvent } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useLayoutEffect } from 'react';
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

export default function Index() {
  const emotes = useEmotes((s) => s.emotes);

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

  return (
    <Layout>
      <Navbar className="fixed top-0 right-0 left-0 p-8 w-full lg:w-3/5 md:w-5/6 mx-auto bg-slate-50 dark:bg-gray-900" />

      <section className="pb-8 pt-20 flex flex-wrap gap-2 justify-center">
        {[...emotes].sort((a, b) => b.totalUses - a.totalUses).map((emote) => (
          <EmoteView key={emote.name} {...emote} />
        ))}
      </section>

      {/* TODO: toolbar */}
    </Layout>
  );
}