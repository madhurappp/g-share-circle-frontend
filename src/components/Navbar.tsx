import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const name =
          (user.user_metadata && user.user_metadata.name) ||
          user.email?.split("@")[0] ||
          "User";
        setUserName(name);
      } else {
        setUserName(null);
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserName(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-bold text-blue-600">
        ShareCircle
      </Link>
      <div>
        {userName ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hi, {userName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/auth?mode=login"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=signup"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
