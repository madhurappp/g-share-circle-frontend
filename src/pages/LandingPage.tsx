import { useLocation } from "react-router-dom";

export default function LandingPage() {
  const location = useLocation();
  const message = location.state?.message || null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to ShareCircle</h1>
      <p className="text-lg text-gray-700 mb-6">
        Share what you don’t need, find what you do. Build community through sharing.
      </p>
      {message && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded shadow mb-6">
          {message}
        </div>
      )}
    </div>
  );
}