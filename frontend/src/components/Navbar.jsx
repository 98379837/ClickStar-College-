import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">📷 Click Star</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {token ? (
          <>
            <Link to="/dashboard">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
