import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/alerts", label: "Alerts" },
    { to: "/eval", label: "Eval" },
  ];

  return (
    <aside className="bg-gray-50 border-r w-60 min-h-screen p-4">
      <h2 className="text-lg font-semibold mb-6 text-indigo-600">Menu</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`block px-3 py-2 rounded-md ${
                pathname === link.to
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
