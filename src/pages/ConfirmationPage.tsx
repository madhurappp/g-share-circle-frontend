import { Link } from "react-router-dom";

export default function ConfirmationPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Confirm Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          We’ve sent a confirmation link to your email. <br />
          Please check your inbox and click the link to verify your account.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
