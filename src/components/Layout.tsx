interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main className="overflow-x-hidden mx-auto w-full lg:w-3/5 md:w-5/6 p-8 pb-0">
      {children}
    </main>
  );
}