import animeLoading from '@/assets/loading.gif';

export default function Loading() {
  return (
    <section className="py-2">
      <img src={animeLoading} alt="guruguru" draggable={false} className="w-48 mb-4" />

      <h2 className="text-lg text-center font-medium italic select-none">loading...</h2>
    </section>
  );
}