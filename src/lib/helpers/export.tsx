import { showNotification } from '@mantine/notifications';
import { closeAllModals, openModal } from '@mantine/modals';
import { Button } from '@mantine/core';
import Twemoji from '@/components/Twemoji';
import useEmotes from '../hooks/useEmotes';
import getConfirmation from '@/lib/helpers/getConfirmation';
import applyCustomModalOptions from './applyCustomModalOptions';

const toFile = () => {
  const { emotes } = useEmotes.getState();

  const data = JSON.stringify(emotes);
  const blob = new Blob([data], { type: 'application/json' });

  const el = document.createElement('a');
  el.href = URL.createObjectURL(blob);
  el.download = `export-emotes-${Date.now()}.json`;
  el.click();

  URL.revokeObjectURL(el.href);

  closeAllModals();

  showNotification({
    title: <Twemoji>Exported ✨</Twemoji>,
    message: (
      <p>
        Exported{' '}
        <span className="font-semibold text-slate-500 dark:text-slate-300">
          {emotes.length}
        </span>{' '}
        emotes.
      </p>
    ),
    color: 'teal',
  });
};

const toLocalStorage = async () => {
  if (window.localStorage.getItem('emotes')) {
    const confirm = await getConfirmation(
      applyCustomModalOptions({
        modalId: 'confirm-overwrite',
        centered: true,
        title: <Twemoji>One moment! 🤨</Twemoji>,
        children: (
          <p>
            It looks like you already have emotes in your local storage. Would
            you like to overwrite them?
          </p>
        ),
        confirmProps: {
          color: 'violet',
        },
        labels: {
          confirm: 'Do it!',
          cancel: 'Nevermind',
        },
      })
    );

    if (!confirm) return;
  }

  const { emotes } = useEmotes.getState();

  const data = JSON.stringify(emotes);
  window.localStorage.setItem('emotes', data);

  showNotification({
    title: <Twemoji>Exported ✨</Twemoji>,
    message: (
      <p>
        Exported{' '}
        <span className="font-semibold text-slate-500 dark:text-slate-300">
          {emotes.length}
        </span>{' '}
        emotes.
      </p>
    ),
    color: 'teal',
  });
};

const exportEmotes = () => {
  openModal(
    applyCustomModalOptions({
      modalId: 'export-modal',
      centered: true,
      title: <Twemoji>Backing up! 🔥</Twemoji>,
      children: (
        <section className="flex items-center gap-3">
          <Button color="teal" fullWidth onClick={toFile}>
            Export to file
          </Button>
          <Button color="violet" fullWidth onClick={toLocalStorage}>
            Export to local storage
          </Button>
        </section>
      ),
    })
  );
};

export default exportEmotes;