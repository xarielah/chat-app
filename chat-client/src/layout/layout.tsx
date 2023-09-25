const Layout = ({ children }: ILayout) => {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center text-green-400 bg-zinc-900">
        {children}
      </main>
    </>
  );
};

export default Layout;

interface ILayout {
  children: React.ReactNode;
}
