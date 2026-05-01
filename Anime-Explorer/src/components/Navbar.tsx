export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">Anime Explorer</h1>

      <span className="text-sm text-slate-500">
        Powered by Jikan API
      </span>
    </header>
  );
}