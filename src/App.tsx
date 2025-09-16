import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ConfirmationPage from "./pages/ConfirmationPage";
import EmailConfirmed from "./pages/EmailConfirmed";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
