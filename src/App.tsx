import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import ConfirmPage from "./pages/ConfirmPage";
import EmailConfirmed from "./pages/EmailConfirmed";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Landing / Home */}
        <Route index element={<LandingPage />} />

        {/* Auth page with login/signup toggle */}
        <Route path="auth" element={<AuthPage />} />

        {/* Dashboard for logged-in users */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Confirmation handler (email verification) */}
        <Route path="confirm" element={<ConfirmPage />} />

        {/* Optional "Email confirmed" success page */}
        <Route path="email-confirmed" element={<EmailConfirmed />} />
      </Route>
    </Routes>
  );
}

export default App;
