import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    alert("Logged in successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 max-w-md mx-auto">
      <input {...register("email")} type="email" placeholder="Email" className="border p-2 w-full" />
      <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full" />
      <button className="bg-green-600 text-white px-4 py-2">Login</button>
    </form>
  );
}
