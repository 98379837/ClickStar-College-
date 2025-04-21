import { useEffect, useState } from "react";
import axios from "axios";
import ClientProfile from "./ClientProfile";
import PhotographerProfileEdit from "./PhotographerProfileEdit";
import AdminPanel from "./AdminPanel";

export default function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user) return <div className="p-6">Loading...</div>;

  const greeting =
    user.isAdmin
      ? "Hello Admin 👑"
      : user.role === "photographer"
      ? "Hello Photographer 📷"
      : "Hello Sir / Ma'am 🙏";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{greeting}</h2>

      {/* Render role-based profile component */}
      {user.isAdmin ? (
        <AdminPanel />
      ) : user.role === "photographer" ? (
        <PhotographerProfileEdit />
      ) : (
        <ClientProfile />
      )}

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 mt-6 block mx-auto rounded"
      >
        Logout
      </button>
    </div>
  );
}
