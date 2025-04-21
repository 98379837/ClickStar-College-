import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">My Bookings</h2>
      {bookings.map((b, idx) => (
        <div key={idx} className="border p-4 mb-2">
          <p><strong>Photographer:</strong> {b.photographerId?.username}</p>
          <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
          <p><strong>Event:</strong> {b.eventType}</p>
          <p><strong>Status:</strong> {b.status}</p>
        </div>
      ))}
    </div>
  );
}
