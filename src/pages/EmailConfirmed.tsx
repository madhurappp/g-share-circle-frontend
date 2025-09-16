import { Link } from "react-router-dom";

export default function EmailConfirmed() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Email Confirmed 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your email has been successfully verified. <br />
          You can now log in and start using ShareCircle.
        </p>
        <Link
          to="/auth"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
