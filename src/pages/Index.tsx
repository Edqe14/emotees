import { ActionIcon } from '@mantine/core';
import { IconBasket, IconMoodHappy, IconMoon, IconSun } from '@tabler/icons';
import Layout from '@/components/Layout';
import Logo from '@/components/Logo';
import useTheme from '@/lib/hooks/useTheme';

export default function Index() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout>
      <section className="flex w-full items-center justify-between">
        <Logo />

        <section className="flex gap-4">
          <ActionIcon color="violet" variant="light" radius="xl">
            <IconMoodHappy size={20} />
          </ActionIcon>

          <ActionIcon color="violet" variant="light" radius="xl">
            <IconBasket size={20} />
          </ActionIcon>

          <ActionIcon color="violet" variant="light" radius="xl" onClick={toggleTheme}>
            {theme === 'dark' && <IconSun size={20} />}
            {theme === 'light' && <IconMoon size={20} />}
          </ActionIcon>
        </section>
      </section>
    </Layout>
  );
}