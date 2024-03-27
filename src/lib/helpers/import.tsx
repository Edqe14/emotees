import { Button } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import Twemoji from '@/components/Twemoji';
import EmoteImporter from '@/components/EmoteImporter';
import Emote, { EmoteValidator } from '../structs/Emote';
import applyCustomModalOptions from './applyCustomModalOptions';

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

const importEmotes = () => {
  openModal(
    applyCustomModalOptions({
      modalId: 'import-modal',
      centered: true,
      title: <Twemoji>Let&apos;s get importin&apos; 🤙</Twemoji>,
      children: (
        <section className="flex items-center gap-3">
          <Button color="teal" fullWidth onClick={fromFile}>
            Import from file
          </Button>
          <Button color="violet" fullWidth onClick={fromLocalStorage}>
            Import from local storage
          </Button>
        </section>
      ),
    })
  );
};

export default importEmotes;