import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/customers?limit=10", {
      headers: { "x-api-key": "local-dev-key" },
    })
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-700">
            Customer Dashboard
          </h1>
          {loading ? (
            <Loader />
          ) : (
            <Table
              columns={["id", "name", "email", "created_at"]}
              data={customers}
            />
          )}
        </div>
      </main>
    </div>
  );
}
