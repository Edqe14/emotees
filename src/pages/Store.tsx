import { Button } from '@mantine/core';
import Layout from '@/components/Layout';
import useUser from '@/lib/hooks/useUser';

export default function Store() {
  const user = useUser((s) => s.uid);

  return (
    <Layout>
      {user === '9c20oqwqXjgWEBBBDyrOikmKFuj1' && (
        <section>
          <Button>Publish</Button>
        </section>
      )}
    </Layout>
  );
}