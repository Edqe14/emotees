import { Button, Input } from '@mantine/core';
import { closeAllModals, closeModal, openModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { Link, Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Twemoji from '@/components/Twemoji';
import EmoteImporter from '@/components/EmoteImporter';
import Emote, { EmoteValidator } from '../structs/Emote';
import applyCustomModalOptions from './applyCustomModalOptions';
import useUser from '../hooks/useUser';
import useInternal from '../hooks/useInternal';

const fromFile = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;

    try {
      const data = await file.text();
      const emotes = JSON.parse(data);

      if (!Array.isArray(emotes)) {
        return showNotification({
          title: <Twemoji>Invalid file ❌</Twemoji>,
          message: 'The file you selected is not a valid emote file.',
          color: 'red',
        });
      }

      const filtered = emotes
        .filter((e: unknown) => EmoteValidator.isValidSync(e))
        .map((e: Emote) => EmoteValidator.cast(e) as Emote);

      return openModal(
        applyCustomModalOptions({
          modalId: 'import-confirm-modal',
          title: <Twemoji>Are you sure? 🤔</Twemoji>,
          centered: true,
          children: <EmoteImporter emotes={filtered} />,
        })
      );
    } catch {
      showNotification({
        title: <Twemoji>Error ❌</Twemoji>,
        message: 'Invalid file',
        color: 'red',
      });
    }

    input.remove();
  };

  input.click();
};

const fromLocalStorage = () => {
  const data = localStorage.getItem('emotes');
  if (!data) {
    return showNotification({
      title: <Twemoji>Error ❌</Twemoji>,
      message: 'Can\'t find any emotes in your local storage.',
      color: 'red',
    });
  }

  try {
    const emotes = JSON.parse(data);

    if (!Array.isArray(emotes)) {
      return showNotification({
        title: <Twemoji>Invalid data ❌</Twemoji>,
        message:
          'Emote data in your local storage is broken... Try to clear your local storage.',
        color: 'red',
      });
    }

    const filtered = emotes
      .filter((e: unknown) => EmoteValidator.isValidSync(e))
      .map((e: Emote) => EmoteValidator.cast(e) as Emote);

    return openModal(
      applyCustomModalOptions({
        modalId: 'import-confirm-modal',
        title: <Twemoji>Are you sure? 🤔</Twemoji>,
        centered: true,
        children: <EmoteImporter emotes={filtered} />,
      })
    );
  } catch {
    showNotification({
      title: <Twemoji>Error ❌</Twemoji>,
      message: 'Invalid file',
      color: 'red',
    });
  }
};

const DiscordTokenInput = () => {
  const [value, setValue] = useState('');

  const close = () => {
    useInternal.setState({ pasteLock: false });
    closeAllModals();
  };

  const save = () => {
    useUser.setState({ discordToken: value });
    close();
  };

  return (
    <section>
      <p className="mb-2">
        To import emotes from Discord, you need to provide your token. Don&apos;t worry, we won&apos;t save your token into a server.
      </p>

      <div className="flex flex-col gap-2">
        <Input
          type="password"
          required
          className="dark:bg-monotone-600 focus:dark:border-monotone-400"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
        />

        <div className="flex gap-2 justify-end">
          <Button color="red" variant="outline" onClick={close}>Never mind</Button>

          <Link to="/discord_import">
            <Button onClick={save}>Continue</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export const fromDiscord = async (navigate: NavigateFunction, force = false) => {
  useInternal.setState({ pasteLock: true });

  if (useUser.getState().discordToken && !force) {
    closeAllModals();
    return navigate('/discord_import');
  }

  openModal(
    applyCustomModalOptions({
      modalId: 'discord-import-token',
      centered: true,
      title: <Twemoji>Enter your token 🤖</Twemoji>,
      children: <DiscordTokenInput />
    })
  );
};

const importEmotes = () => {
  const Element = () => {
    const navigate = useNavigate();

    return (
      <section className="flex items-center gap-3 flex-wrap">
        <Button color="teal" fullWidth onClick={fromFile}>
          Import from file
        </Button>
        <Button color="violet" fullWidth onClick={fromLocalStorage}>
          Import from local storage
        </Button>
        <Button fullWidth onClick={() => fromDiscord(navigate)}>
          Import from Discord
        </Button>
      </section>
    );
  };

  openModal(
    applyCustomModalOptions({
      modalId: 'import-modal',
      centered: true,
      title: <Twemoji>Let&apos;s get importin&apos; 🤙</Twemoji>,
      children: <Element />,
    })
  );
};

export default importEmotes;