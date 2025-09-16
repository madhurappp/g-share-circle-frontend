import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Login successful!");
        navigate("/"); // ✅ Redirect to home
      }
    } else {
      // Signup
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }, // Save name in metadata
          emailRedirectTo: `${window.location.origin}/email-confirmed`,
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        navigate("/confirmation"); // ✅ Redirect to confirmation page
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login to ShareCircle" : "Sign Up for ShareCircle"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-indigo-600 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <p className="mt-2 text-center">
          <button
            className="text-gray-500 hover:underline"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </p>
      </div>
    </div>
  );
}
