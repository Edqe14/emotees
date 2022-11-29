import animeSad from '@/assets/notfound.png';

export default function NotFound() {
  return (
    <section className="py-2">
      <img src={animeSad} alt="sad anime girl" draggable={false} className="w-48 mb-4" />

      <h2 className="text-lg text-center font-medium italic select-none">oh nyo! can&apos;t find anything</h2>
    </section>
  );
}