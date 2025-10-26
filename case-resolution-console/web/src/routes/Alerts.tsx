import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";

export default function Alerts() {
  const alerts = [
    { id: 1, type: "Fraud", status: "Open", customer: "Alice" },
    { id: 2, type: "Dispute", status: "Resolved", customer: "Bob" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-700">Alerts</h1>
          <Table columns={["id", "type", "status", "customer"]} data={alerts} />
        </div>
      </main>
    </div>
  );
}
