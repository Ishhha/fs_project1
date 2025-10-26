import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Table from "../components/Table";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/api/customers/${id}`, {
      headers: { "x-api-key": "local-dev-key" },
    })
      .then((res) => res.json())
      .then((data) => setCustomer(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  if (!customer)
    return (
      <div className="p-6 text-center text-gray-500">Customer not found.</div>
    );

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Navbar />
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-700">
            Customer Details
          </h1>
          <div className="border p-4 rounded-lg">
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>ID:</strong> {customer.id}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
            <Table
              columns={["id", "amount", "merchant", "category", "occurred_at"]}
              data={customer.transactions || []}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
