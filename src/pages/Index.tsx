import useConfig from '@/lib/store/useConfig';
import useEmotes from '@/lib/store/useEmotes';

export default function Index() {
  const config = useConfig();
  const emotes = useEmotes((s) => s.emotes);

  return (
    <section>
      <h1>{JSON.stringify(config)}</h1>
      <h1>{JSON.stringify(emotes)}</h1>
    </section>
  );
}