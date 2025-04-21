import { useForm } from "react-hook-form";
import axios from "axios";

export default function ReviewPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/reviews", data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Review submitted");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 max-w-md mx-auto">
      <input {...register("photographerId")} placeholder="Photographer ID" className="border p-2 w-full" />
      <input {...register("rating")} type="number" min="1" max="5" className="border p-2 w-full" />
      <textarea {...register("comment")} placeholder="Your feedback" className="border p-2 w-full" />
      <button className="bg-yellow-500 text-white px-4 py-2">Submit Review</button>
    </form>
  );
}
