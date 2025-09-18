// src/pages/LoggedOut.tsx

import { Link } from "react-router-dom";

export default function LoggedOut() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      {/* Logo */}
      <div className="mb-6">
        <img src="/logo.png" alt="ShareCircle Logo" className="h-16" />
      </div>

      <h1 className="text-2xl font-bold mb-4">You’ve been logged out</h1>
      <p className="mb-6 text-gray-600">
        Thanks for visiting ShareCircle. You can log in again or return to the home page.
      </p>

      <div className="flex gap-4">
        <Link
          to="/auth"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
