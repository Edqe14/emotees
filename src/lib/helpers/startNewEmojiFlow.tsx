import { Button, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import { openModal, useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import Twemoji from '@/components/Twemoji';
import useEmotes from '../hooks/useEmotes';
import useInternal from '../hooks/useInternal';
import applyCustomModalOptions from './applyCustomModalOptions';

export function EmojiInfo({ url, name }: { url: string; name?: string }) {
  const modals = useModals();
  const form = useForm({
    initialValues: {
      name: name ?? '',
    },
    validate: {
      name: (value) => {
        if (!value) return 'Name is required';

        const { emotes } = useEmotes.getState();
        const names = emotes.map((e) => e.name);

        if (names.includes(value)) return 'Name is already used';

        return false;
      }
    },
  });

  const onSubmit = form.onSubmit((value) => {
    useEmotes.getState().appendEmote({
      name: value.name,
      file: url.match(/(\d+)\.(?:png|gif|jpg|jpeg|webp)/gi)?.[0] as string,
      addedAt: Date.now(),
      favorite: false,
      totalUses: 0
    });

    modals.closeModal('emote-info');
  });

  useEffect(() => {
    if (form.errors.name) {
      showNotification({
        id: 'emote-info-name-error',
        title: 'Oops, something went wrong',
        color: 'red',
        message: (
          <Twemoji>{form.errors.name as string}</Twemoji>
        ),
      });
    }
  }, [form.errors]);

  return (
    <section className="flex flex-col justify-center items-center">
      <Image
        draggable={false}
        src={url}
        alt="emote"
        className="mx-auto mb-6"
        width="auto"
        classNames={{
          image: 'h-16'
        }}
        withPlaceholder
      />

      <form onSubmit={onSubmit} className="w-full">
        <section className="flex items-center gap-2 mb-6 justify-center">
          <span className="text-xl font-semibold">:</span>

          <input
            type="text"
            required
            className="bg-slate-700 bg-opacity-20 rounded-full text-center font-bold text-white outline-none border-none px-2 py-1"
            placeholder="Name"
            {...form.getInputProps('name')}
            onChange={(ev) =>
              form.setFieldValue('name', ev.target.value.replace(/ /gi, '_'))
            }
          />

          <span className="text-xl font-semibold">:</span>
        </section>

        <section className="flex gap-4 justify-end">
          <Button color="red" variant="outline" onClick={() => modals.closeModal('emote-info')}>Nevermind</Button>
          <Button color="violet" type="submit">Save</Button>
        </section>
      </form>
    </section>
  );
}

export default function startNewEmojiFlow(emojiUrl: string) {
  useInternal.setState({ pasteLock: true });

  if (!emojiUrl) {
    // TODO: modal to input emoji URL
  }

  openModal(
    applyCustomModalOptions({
      modalId: 'emote-info',
      title: 'New emote!!',
      centered: true,
      size: 'md',
      children: <EmojiInfo url={emojiUrl} />,
      onClose: () => useInternal.setState({ pasteLock: false })
    })
  );
}
