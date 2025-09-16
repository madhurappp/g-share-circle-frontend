import { useLocation } from "react-router-dom";

export default function LandingPage() {
  const location = useLocation();
  const signupSuccess = location.state?.signupSuccess;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to ShareCircle</h1>
      <p className="mb-6">Search and share items with your community.</p>
      {signupSuccess && (
        <div className="p-4 bg-green-100 text-green-700 rounded shadow">
          Please check your email to confirm your signup.
        </div>
      )}
    </div>
  );
}
