// src/pages/Dashboard.tsx

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      {/* Logo */}
      <div className="mb-6">
        <img src="/logo.png" alt="ShareCircle Logo" className="h-16" />
      </div>

      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2">User’s shared items will show here</p>
    </div>
  );
}
