import { Switch, Button } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import Emote from '@/lib/structs/Emote';
import useEmotes from '@/lib/hooks/useEmotes';
import applyCustomNotificationOptions from '@/lib/helpers/applyCustomNotification';
import Twemoji from './Twemoji';

export default function EmoteImporter({ emotes }: { emotes: Emote[] }) {
  const modals = useModals();
  const [overwrite, setOverwrite] = useState(false);

  const importEmotes = () => {
    const { setEmotes } = useEmotes.getState();
    let dupes = 0;

    const mappedEmote = emotes.map((e) => ({
      ...e,
      addedAt: Date.now(),
    }));

    if (overwrite) setEmotes(mappedEmote);
    else {
      const all = useEmotes.getState().emotes;
      const clearedDupe = mappedEmote.filter((e) => !all.some((a) => a.name === e.name));

      useEmotes.setState((curr) => ({ emotes: [...curr.emotes, ...clearedDupe] }));
      dupes = emotes.length - clearedDupe.length;
    };

    showNotification(applyCustomNotificationOptions({
      title: <Twemoji>Imported 🎉</Twemoji>,
      message: <Twemoji>Successfuly imported <span className="font-semibold text-slate-500 dark:text-slate-300">{emotes.length - dupes}</span> emotes 😊 {dupes !== 0 && <span className="italic">({dupes} dupes)</span>}</Twemoji>,
      color: 'teal'
    }));

    modals.closeAll();
  };

  return (
    <section>
      <p className="mb-3">You&apos;re going to import <span className="font-semibold">{emotes.length}</span> emotes.</p>
      <Switch className="flex mb-4" checked={overwrite} onChange={(ev) => setOverwrite(ev.target.checked)} label="Overwrite" />

      <p className="text-lg font-medium text-red-500 text-center mb-3">This action is not undo-able!</p>

      <section className="flex gap-3 items-center justify-center">
        <Button variant="outline" color="red" onClick={() => modals.closeModal('import-confirm-modal')}>Nevermind</Button>
        <Button color="violet" onClick={importEmotes}>Import</Button>
      </section>
    </section>
  );
};