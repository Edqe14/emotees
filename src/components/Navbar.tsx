import { ActionIcon, Avatar, Button, Menu } from '@mantine/core';
import { IconBasket, IconBrandGithub, IconBrandGoogle, IconMoodHappy, IconMoon, IconSettings, IconSun, IconUser, IconUserOff } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { openModal, useModals } from '@mantine/modals';
import shallow from 'zustand/shallow';
import useTheme from '@/lib/hooks/useTheme';
import Logo from '@/components/Logo';
import concat from '@/lib/helpers/concat';
import useUser from '@/lib/hooks/useUser';
import applyCustomModalOptions from '@/lib/helpers/applyCustomModalOptions';
import auth, { login } from '@/lib/helpers/firebase/auth';

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
          <Button onClick={async () => { await login('google'); closeModal(); }}>Continue with <IconBrandGoogle className="ml-2" size={20} /></Button>
          <Button color="violet" onClick={async () => { await login('github'); closeModal(); }}>Continue with <IconBrandGithub className="ml-2" size={20} /></Button>
        </section>
      )
    }));
  };

  const manageModal = () => {
    // TODO: manage account
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
            <ActionIcon className="w-auto">
              <Avatar radius="xl" src={photo} alt="no image here" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            {!uid && (
              <Menu.Item onClick={loginModal} icon={<IconUser size={16} />}>Login</Menu.Item>
            )}

            {uid && (
              <>
                <Menu.Item onClick={manageModal} icon={<IconSettings size={16} />}>Manage</Menu.Item>
                <Menu.Item color="red" onClick={() => auth.signOut()} icon={<IconUserOff size={16} />}>Logout</Menu.Item>
              </>
            )}
          </Menu.Dropdown>
        </Menu>
      </section>
    </nav>
  );
}