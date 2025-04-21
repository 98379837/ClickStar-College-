import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-6">
      <h2 className="text-4xl font-bold">Welcome to Click Star 📸</h2>
      <p className="text-gray-600 text-lg max-w-md">
        Discover and book top photographers for every occasion.
      </p>
      {!token ? (
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg"
        >
          Get Started
        </button>
      ) : (
        <button
          onClick={() => navigate("/search")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg"
        >
          Book Now
        </button>
      )}
    </div>
  );
}
