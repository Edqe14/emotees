import { Button, Image, Input as MantineInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { openModal, useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { createRef, useEffect } from 'react';
import Twemoji from '@/components/Twemoji';
import useEmotes from '../hooks/useEmotes';
import useInternal from '../hooks/useInternal';
import applyCustomModalOptions from './applyCustomModalOptions';
import Input from '@/components/Input';
import isURL from './isURL';
import isDiscordEmojiURL from './isDiscordEmojiURL';
import applyCustomNotificationOptions from './applyCustomNotification';

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

    showNotification({
      id: 'emote-new-added',
      title: (
        <Twemoji>Yay 🎉</Twemoji>
      ),
      color: 'green',
      message: (
        <Twemoji>Added <span className="font-semibold text-slate-500 dark:text-slate-300">{value.name}</span> to the list.</Twemoji>
      ),
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

          <Input
            type="text"
            required
            placeholder="name"
            maxLength={20}
            className="dark:bg-monotone-600 focus:dark:border-monotone-400 text-center"
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

export default function startNewEmojiFlow(emojiUrl?: string) {
  useInternal.setState({ pasteLock: true, shortcutLock: true });

  if (!emojiUrl) {
    const EmojiUrlInput = () => {
      const modals = useModals();
      const form = useForm({
        initialValues: {
          url: ''
        },
        validate: {
          url: (value) => {
            if (!value) return 'URL is required';
            if (!isURL(value)) return 'Invalid URL ❌';
            if (!isDiscordEmojiURL(value)) return 'Hey! Sorry for the inconvenience, but we currently only support Discord emoji URLs only 😔';

            return false;
          }
        },
      });

      const inputRef = createRef<HTMLInputElement>();

      useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
      }, [inputRef]);

      const onSubmit = form.onSubmit((value) => {
        modals.closeModal('emote-new-url');
        startNewEmojiFlow(value.url);
      });

      useEffect(() => {
        if (form.errors.url) {
          showNotification(applyCustomNotificationOptions({
            id: 'paste-unsupported-url',
            title: 'Unsupported URL',
            message: (
              <Twemoji>{form.errors.url}</Twemoji>
            ),
            color: 'red',
          }));
        }
      }, [form.errors]);

      return (
        <section className="flex flex-col justify-center items-center">
          <form onSubmit={onSubmit} className="w-full">
            <MantineInput.Wrapper label="Discord emoji URL" className="flex flex-col mb-4" classNames={{ label: 'mb-2' }}>
              <Input
                ref={inputRef}
                type="text"
                required
                className="dark:bg-monotone-600 focus:dark:border-monotone-400"
                {...form.getInputProps('url')}
              />
            </MantineInput.Wrapper>

            <section className="flex gap-4 justify-end">
              <Button color="red" variant="outline" onClick={() => modals.closeModal('emote-info')}>Nevermind</Button>
              <Button color="violet" type="submit" disabled={!form.values.url}>Next</Button>
            </section>
          </form>
        </section>
      );
    };

    return openModal(
      applyCustomModalOptions({
        modalId: 'emote-new-url',
        title: (
          <Twemoji>Let&apos;s get started! 🤙</Twemoji>
        ),
        centered: true,
        size: 'md',
        children: <EmojiUrlInput />,
        onClose: () => useInternal.setState({ pasteLock: false, shortcutLock: false }),
      })
    );
  }

  openModal(
    applyCustomModalOptions({
      modalId: 'emote-info',
      title: (
        <Twemoji>What should this be named 🤔</Twemoji>
      ),
      centered: true,
      size: 'md',
      children: <EmojiInfo url={emojiUrl} />,
      onClose: () => useInternal.setState({ pasteLock: false, shortcutLock: false }),
    })
  );
}
