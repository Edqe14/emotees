import { Button } from '@mantine/core';
import Layout from '@/components/Layout';
import useUser from '@/lib/hooks/useUser';
import Twemoji from '@/components/Twemoji';

export default function Store() {
  const user = useUser((s) => s.uid);

  return (
    <Layout>
      {user === '9c20oqwqXjgWEBBBDyrOikmKFuj1' && (
        <section className="w-full flex justify-end">
          <Button leftIcon={<Twemoji>☁️</Twemoji>}>Publish</Button>
        </section>
      )}
    </Layout>
  );
}