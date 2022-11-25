interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main className="h-screen overflow-hidden mx-auto w-full lg:w-3/5 md:w-4/5 p-8">
      {children}
    </main>
  );
}