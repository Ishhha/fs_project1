import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Case Resolution Console
        </Link>
        <nav className="flex gap-6">
          <Link to="/dashboard" className="text-gray-700 hover:text-indigo-500">
            Dashboard
          </Link>
          <Link to="/alerts" className="text-gray-700 hover:text-indigo-500">
            Alerts
          </Link>
          <Link to="/eval" className="text-gray-700 hover:text-indigo-500">
            Eval
          </Link>
        </nav>
      </div>
    </header>
  );
}
