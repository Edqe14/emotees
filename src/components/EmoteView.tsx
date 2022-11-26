import { useClipboard } from '@mantine/hooks';
import { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import Emote from '@/lib/structs/Emote';
import applyCustomNotificationOptions from '@/lib/helpers/applyCustomNotification';
import Twemoji from './Twemoji';
import useEmotes from '@/lib/hooks/useEmotes';
import useInternal from '@/lib/hooks/useInternal';

export default function EmoteView({ name, file }: Emote) {
  const setScrollPosition = useInternal((s) => s.setScrollPosition);
  const clipboard = useClipboard({ timeout: 200 });
  const url = `https://cdn.discordapp.com/emojis/${file}?size=48&quality=lossless`;

  const onClick = () => {
    setScrollPosition(window.scrollY);
    clipboard.copy(url);
  };

  useEffect(() => {
    if (clipboard.copied) {
      const { emotes, updateEmote } = useEmotes.getState();
      const index = emotes.findIndex((e) => e.name === name);
      if (index !== -1) {
        updateEmote(index, (current) => ({ totalUses: current.totalUses + 1 }));
      }

      return showNotification(applyCustomNotificationOptions({
        title: 'Copied!',
        message: (
          <Twemoji>Successfully copied <span className="font-semibold text-slate-500 dark:text-slate-300">{name}</span> to your clipboard!</Twemoji>
        ),
        color: 'teal',
      }));
    }

    if (clipboard.error) {
      // eslint-disable-next-line no-console
      console.error(clipboard.error);

      return showNotification(applyCustomNotificationOptions({
        title: 'Oops, something went wrong',
        message: (
          <Twemoji>Failed to copy <span className="font-semibold text-slate-300">{name}</span> to your clipboard!</Twemoji>
        ),
        color: 'red',
      }));
    }
  }, [clipboard.copied, clipboard.error]);


  return (
    <span onClick={onClick} className="w-16 p-2 rounded-md cursor-pointer hover:bg-slate-200 hover:dark:bg-slate-700 transition-colors duration-100 bg-opacity-50 flex items-center justify-center">
      <img
        key={name}
        src={url}
        alt={name}
        className="w-full h-auto"
      />
    </span>
  );
}