import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        const name = data.session.user.user_metadata?.name || null;
        setUserName(name);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const name = session.user.user_metadata?.name || null;
        setUserName(name);
      } else {
        setUserName(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserName(null);
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <div
        className="text-xl font-bold cursor-pointer text-blue-600"
        onClick={() => navigate("/")}
      >
        ShareCircle
      </div>
      <div className="space-x-4">
        {userName ? (
          <>
            <span className="font-medium">Hello, {userName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/auth?mode=login")}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth?mode=signup")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
