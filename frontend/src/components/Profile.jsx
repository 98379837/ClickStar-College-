import { useEffect, useState } from "react";
import axios from "axios";
import ClientProfile from "./ClientProfile";
import PhotographerProfileEdit from "./PhotographerProfileEdit";
import AdminPanel from "./AdminPanel";

export default function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data));
  }, []);

  if (!user) return <div className="p-6">Loading...</div>;

  if (user.isAdmin) return <AdminPanel />;
  if (user.role === "photographer") return <PhotographerProfileEdit />;
  return <ClientProfile />;
}
