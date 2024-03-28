import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="py-2 flex flex-col items-center">
      <img src="/assets/notfound.png" loading="lazy" decoding="async" alt="sad anime girl" draggable={false} className="w-48 mb-4" />

      <h2 className="text-lg text-center font-medium italic select-none">oh nyo! can&apos;t find anything</h2>

      <div className="flex gap-4">
        <Link to="/store" className="text-blue-500 mt-2">
          <Button className="mt-2">Check the store</Button>
        </Link>
        <Link to="/discord_import" className="text-blue-500 mt-2">
          <Button className="mt-2" color="teal">Import from Discord</Button>
        </Link>
      </div>
    </section>
  );
}