import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Anime", path: "/anime" },
  { name: "Favorites", path: "/favorites" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-slate-900 text-white p-4">
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block rounded px-4 py-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}