// src/components/Navbar.tsx

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/logged-out"); // redirect to logged-out page
  };

  return (
    <nav className="flex items-center justify-between p-4 shadow bg-white">
      {/* Logo: Goes to Dashboard if logged in, LandingPage otherwise */}
      <Link to={user ? "/dashboard" : "/"} className="flex items-center">
        <img src="/logo.png" alt="ShareCircle Logo" className="h-10" />
      </Link>

      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <Link to="/auth?mode=login" className="hover:underline">
              Login
            </Link>
            <Link to="/auth?mode=signup" className="hover:underline">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
