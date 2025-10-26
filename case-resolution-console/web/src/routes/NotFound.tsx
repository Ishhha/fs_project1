import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function NotFound() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-red-600 mb-2">404</h1>
          <p className="text-gray-700">Page not found.</p>
        </div>
      </main>
    </div>
  );
}
