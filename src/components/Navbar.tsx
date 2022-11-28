import { ActionIcon, Avatar } from '@mantine/core';
import { IconBasket, IconMoodHappy, IconMoon, IconSun } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import useTheme from '@/lib/hooks/useTheme';
import Logo from '@/components/Logo';
import concat from '@/lib/helpers/concat';

export default function Navbar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={concat('flex w-full items-center justify-between mb-8 transition-colors duration-100 z-[500]', className)}>
      <Logo />

      <section className="flex gap-4 items-center">
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
        <ActionIcon>
          <Avatar radius="xl" src={null} alt="no image here" />
        </ActionIcon>
      </section>
    </nav>
  );
}