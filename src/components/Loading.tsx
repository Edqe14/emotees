export default function Loading() {
  return (
    <section className="py-2 flex flex-col items-center">
      <video src="/assets/loading.webm" preload="auto" playsInline muted autoPlay loop draggable={false} className="w-48 mb-4 rounded-xl" />

      <h2 className="text-lg font-medium italic select-none">loading...</h2>
    </section>
  );
}