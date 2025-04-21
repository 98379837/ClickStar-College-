import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [date, setDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [photographerId, setPhotographerId] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (photographerId) {
      axios.get(`http://localhost:5000/api/profile/${photographerId}/availability`).then(res => {
        setAvailableDates(res.data.map(d => new Date(d)));
      });
    }
  }, [photographerId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/bookings/create", {
      photographerId,
      date,
      eventType: "Wedding"
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Booking request sent");
  };

  return (
    <form onSubmit={onSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <input value={photographerId} onChange={(e) => setPhotographerId(e.target.value)} placeholder="Photographer ID" className="border p-2 w-full" />
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        includeDates={availableDates}
        placeholderText="Select available date"
        className="border p-2 w-full"
      />
      <button className="bg-green-600 text-white px-4 py-2">Book</button>
    </form>
  );
}
