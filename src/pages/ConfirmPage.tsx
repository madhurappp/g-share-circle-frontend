import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function ConfirmPage() {
  const [status, setStatus] = useState("Confirming your email...");
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1); // strip "#"
    const params = new URLSearchParams(hash);

    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token) {
      supabase.auth
        .setSession({
          access_token,
          refresh_token: refresh_token || "",
        })
        .then(() => {
          setStatus("✅ Email confirmed! Your account is ready.");
          setTimeout(() => navigate("/"), 3000); // redirect to landing page
        })
        .catch(() => {
          setStatus("❌ Failed to confirm email. Please try logging in.");
        });
    } else {
      setStatus(
        "❌ Email confirmation failed. The link may be expired or already used."
      );
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Email Confirmation</h1>
        <p>{status}</p>
      </div>
    </div>
  );
}
