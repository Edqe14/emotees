import { ActionIcon, Avatar, Button, Menu, Switch } from '@mantine/core';
import { IconBasket, IconBrandGithub, IconBrandGoogle, IconBrandTwitter, IconFileExport, IconFileImport, IconMoodHappy, IconMoon, IconSettings, IconSun, IconTrash, IconUser, IconUserOff } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { openModal, useModals } from '@mantine/modals';
import shallow from 'zustand/shallow';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import useTheme from '@/lib/hooks/useTheme';
import Logo from '@/components/Logo';
import concat from '@/lib/helpers/concat';
import useUser from '@/lib/hooks/useUser';
import applyCustomModalOptions from '@/lib/helpers/applyCustomModalOptions';
import auth, { login } from '@/lib/helpers/firebase/auth';
import useEmotes from '@/lib/hooks/useEmotes';
import Twemoji from './Twemoji';
import Emote, { EmoteValidator } from '@/lib/structs/Emote';
import applyCustomNotificationOptions from '@/lib/helpers/applyCustomNotification';

const ImportEmoteContent = ({ emotes }: { emotes: Emote[] }) => {
  const modals = useModals();
  const [override, setOverride] = useState(false);

  const importEmotes = () => {
    const { setEmotes } = useEmotes.getState();
    let dupes = 0;

    if (override) setEmotes(emotes);
    else {
      const all = useEmotes.getState().emotes;
      const clearedDupe = emotes.filter((e) => !all.some((a) => a.name === e.name));

      useEmotes.setState((curr) => ({ emotes: [...curr.emotes, ...clearedDupe] }));
      dupes = emotes.length - clearedDupe.length;
    };

    showNotification(applyCustomNotificationOptions({
      title: <Twemoji>Imported 🎉</Twemoji>,
      message: <Twemoji>Successfuly imported <span className="font-semibold text-slate-500 dark:text-slate-300">{emotes.length - dupes}</span> emotes 😊 {dupes && <span className="italic">({dupes} dupes)</span>}</Twemoji>,
      color: 'teal'
    }));

    modals.closeAll();
  };

  return (
    <section>
      <p className="mb-3">You&apos;re going to import <span className="font-semibold">{emotes.length}</span> emotes.</p>
      <Switch className="flex mb-4" checked={override} onChange={(ev) => setOverride(ev.target.checked)} label="Override" />

      <p className="text-lg font-medium text-red-500 text-center mb-3">This action is not undo-able!</p>

      <section className="flex gap-3 items-center justify-center">
        <Button variant="outline" color="red" onClick={() => modals.closeModal('import-confirm-modal')}>Nevermind</Button>
        <Button color="violet" onClick={importEmotes}>Import</Button>
      </section>
    </section>
  );
};

export default function Navbar({ className }: { className?: string }) {
  const [uid, photo] = useUser((s) => [s.uid, s.photoURL], shallow);
  const navigate = useNavigate();
  const modals = useModals();
  const { theme, toggleTheme } = useTheme();

  const loginModal = () => {
    const closeModal = () => modals.closeModal('login-modal');

    openModal(applyCustomModalOptions({
      modalId: 'login-modal',
      title: 'Login',
      centered: true,
      children: (
        <section className="flex flex-col items-center gap-2">
          <Button color="teal" onClick={async () => { await login('google'); closeModal(); }}>Continue with <IconBrandGoogle className="ml-2" size={20} /></Button>
          <Button color="violet" onClick={async () => { await login('github'); closeModal(); }}>Continue with <IconBrandGithub className="ml-2" size={20} /></Button>
          <Button color="blue" onClick={async () => { await login('twitter'); closeModal(); }}>Continue with <IconBrandTwitter className="ml-2" size={20} /></Button>
        </section>
      )
    }));
  };

  const exportEmotes = () => {
    const { emotes } = useEmotes.getState();

    const data = JSON.stringify(emotes);
    const blob = new Blob([data], { type: 'application/json' });

    const el = document.createElement('a');
    el.href = URL.createObjectURL(blob);
    el.download = `export-emotes-${Date.now()}.json`;
    el.click();

    URL.revokeObjectURL(el.href);

    showNotification({
      title: <Twemoji>Exported ✨</Twemoji>,
      message: <p>Exported <span className="font-semibold text-slate-500 dark:text-slate-300">{emotes.length}</span> emotes.</p>,
      color: 'teal'
    });
  };

  // IMPORTING
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
            color: 'red'
          });
        }

        const filtered = emotes
          .filter((e: unknown) => EmoteValidator.isValidSync(e))
          .map((e: Emote) => EmoteValidator.cast(e) as Emote);

        return openModal(applyCustomModalOptions({
          modalId: 'import-confirm-modal',
          title: <Twemoji>Are you sure? 🤔</Twemoji>,
          centered: true,
          children: (<ImportEmoteContent emotes={filtered} />),
        }));
      } catch {
        showNotification({
          title: <Twemoji>Error ❌</Twemoji>,
          message: 'Invalid file',
          color: 'red'
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
        color: 'red'
      });
    };

    try {
      const emotes = JSON.parse(data);

      if (!Array.isArray(emotes)) {
        return showNotification({
          title: <Twemoji>Invalid data ❌</Twemoji>,
          message: 'Emote data in your local storage is broken... Try to clear your local storage.',
          color: 'red'
        });
      }

      const filtered = emotes
        .filter((e: unknown) => EmoteValidator.isValidSync(e))
        .map((e: Emote) => EmoteValidator.cast(e) as Emote);

      return openModal(applyCustomModalOptions({
        modalId: 'import-confirm-modal',
        title: <Twemoji>Are you sure? 🤔</Twemoji>,
        centered: true,
        children: (<ImportEmoteContent emotes={filtered} />),
      }));
    } catch {
      showNotification({
        title: <Twemoji>Error ❌</Twemoji>,
        message: 'Invalid file',
        color: 'red'
      });
    }
  };

  const importEmotes = () => {
    openModal(applyCustomModalOptions({
      modalId: 'import-modal',
      centered: true,
      title: <Twemoji>Let&apos;s get importin&apos; 🤙</Twemoji>,
      children: (
        <section className="flex items-center gap-3">
          <Button color="teal" fullWidth onClick={fromFile}>Import from file</Button>
          <Button color="violet" fullWidth onClick={fromLocalStorage}>Import from local storage</Button>
        </section>
      ),
    }));
  };

  const manageModal = () => {
    openModal(applyCustomModalOptions({
      modalId: 'manage-modal',
      title: <Twemoji>Manage 🔧</Twemoji>,
      classNames: {
        header: 'mb-2'
      },
      centered: true,
      children: (
        <section>
          <h4 className="font-medium text-sm mb-2 opacity-70">Emotes</h4>

          <section className="flex flex-col justify-center">
            <section className="flex gap-3 mb-3">
              <Button fullWidth rightIcon={<IconFileExport size={18} />} onClick={exportEmotes}>Export</Button>
              <Button fullWidth rightIcon={<IconFileImport size={18} />} onClick={importEmotes}>Import</Button>
            </section>

            <section className="flex items-center justify-center">
              <Button color="red" rightIcon={<IconTrash size={18} />}>Clear all</Button>
            </section>
          </section>
        </section>
      )
    }));
  };

  return (
    <nav className={concat('flex w-full items-center justify-between mb-8 transition-colors duration-100 z-[310] gap-4', className)}>
      <Logo />

      <section className="flex gap-3 items-center">
        <ActionIcon onClick={() => navigate('/')} color="violet" variant="light" radius="xl">
          <IconMoodHappy size={20} />
        </ActionIcon>

        <ActionIcon onClick={() => navigate('/store')} color="violet" variant="light" radius="xl">
          <IconBasket size={20} />
        </ActionIcon>

        <ActionIcon color="violet" variant="light" radius="xl" onClick={toggleTheme}>
          {theme === 'dark' && <IconSun size={20} />}
          {theme === 'light' && <IconMoon size={20} />}
        </ActionIcon>

        {/* TODO: avatar? */}
        <Menu
          withArrow
          withinPortal
          zIndex={320}
          width={150}
          position="bottom"
          offset={15}
          classNames={{
            dropdown: 'dark:bg-slate-800'
          }}
        >
          <Menu.Target>
            <ActionIcon className="w-auto h-auto" radius="xl">
              <Avatar radius="xl" src={photo} alt="no image here" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={manageModal} icon={<IconSettings size={16} />}>Manage</Menu.Item>

            {!uid && (
              <Menu.Item onClick={loginModal} icon={<IconUser size={16} />}>Login</Menu.Item>
            )}

            {uid && (
              <Menu.Item color="red" onClick={() => auth.signOut()} icon={<IconUserOff size={16} />}>Logout</Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </section>
    </nav>
  );
}