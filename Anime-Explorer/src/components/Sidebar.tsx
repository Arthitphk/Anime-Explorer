import { NavLink } from "react-router-dom";
import { useFavorites } from "../context/useFavorites";

const links = [
  { name: "Home", path: "/" },
  { name: "Anime", path: "/anime" },
  { name: "Favorites", path: "/favorites" },
];

export default function Sidebar() {
  const { favorites } = useFavorites();

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-slate-900 text-white p-4">
      <nav className="space-y-2">
        {links.map((link) => {
          const isFavorites = link.path === "/favorites";

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center justify-between rounded px-4 py-2 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span>{link.name}</span>

              {isFavorites && favorites.length > 0 && (
                <span className="rounded-full bg-linear-to-r from-blue-500 to-purple-500 px-2 py-0.5 text-xs text-white shadow-md">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
