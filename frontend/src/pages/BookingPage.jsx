import { useForm } from "react-hook-form";
import axios from "axios";

export default function BookingPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/bookings/create", data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Booking successful!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 max-w-md mx-auto">
      <input {...register("photographerId")} placeholder="Photographer ID" className="border p-2 w-full" />
      <input {...register("date")} type="date" className="border p-2 w-full" />
      <input {...register("eventType")} placeholder="Event Type" className="border p-2 w-full" />
      <button className="bg-purple-600 text-white px-4 py-2">Book Now</button>
    </form>
  );
}
