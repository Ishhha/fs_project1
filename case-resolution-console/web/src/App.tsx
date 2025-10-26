import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Alerts from "./routes/Alerts";
import Customer from "./routes/Customer";
import Eval from "./routes/Eval";
import NotFound from "./routes/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { TriageProvider } from "./context/TriageContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TriageProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/customer/:id" element={<Customer />} />
            <Route path="/eval" element={<Eval />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TriageProvider>
      </AuthProvider>
    </Router>
  );
}
