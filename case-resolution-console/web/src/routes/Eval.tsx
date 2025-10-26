import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Modal from "../components/Modal";

export default function Eval() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-700">Eval</h1>
          <p className="text-gray-600 mb-6">
            Run evaluation jobs on golden triage cases and analyze performance.
          </p>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            onClick={() => setOpen(true)}
          >
            Run Eval
          </button>

          <Modal open={open} onClose={() => setOpen(false)} title="Evaluation Run">
            <p className="text-gray-700 mb-4">
              Evaluation started successfully. Check logs for progress.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </Modal>
        </div>
      </main>
    </div>
  );
}
