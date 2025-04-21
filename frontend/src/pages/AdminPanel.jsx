import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [allBookings, setAllBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios.get("http://localhost:5000/api/bookings/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllBookings(res.data);
    };
    fetchAll();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Panel: All Bookings</h2>
      {allBookings.map((b, idx) => (
        <div key={idx} className="border p-4 mb-2">
          <p><strong>User:</strong> {b.userId?.username}</p>
          <p><strong>Photographer:</strong> {b.photographerId?.username}</p>
          <p><strong>Status:</strong> {b.status}</p>
        </div>
      ))}
    </div>
  );
}
