import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (!data.username || !data.email || !data.password || !data.role) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/api/auth/register", data);
    alert("Registered successfully. Please log in.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 max-w-md mx-auto">
      <input {...register("username")} placeholder="Username" className="border p-2 w-full" required />
      <input {...register("email")} type="email" placeholder="Email" className="border p-2 w-full" required />
      <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full" required />
      <select {...register("role")} className="border p-2 w-full" required>
        <option value="">Select Role</option>
        <option value="client">Client</option>
        <option value="photographer">Photographer</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2">Register</button>
    </form>
  );
}
