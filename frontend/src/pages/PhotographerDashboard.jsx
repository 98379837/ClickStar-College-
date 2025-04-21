import { useEffect, useState } from "react";
import axios from "axios";

export default function PhotographerDashboard() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings/my", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setBookings(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/bookings/status/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Updated!");
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Photographer Bookings</h2>
      {bookings.map((b, idx) => (
        <div key={idx} className="border p-4 mb-2">
          <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {b.status}</p>
          <button onClick={() => updateStatus(b._id, "accepted")} className="bg-green-600 text-white px-2 py-1 mr-2">Accept</button>
          <button onClick={() => updateStatus(b._id, "rejected")} className="bg-red-600 text-white px-2 py-1">Reject</button>
        </div>
      ))}
    </div>
  );
}
