import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (!data.username || !data.email || !data.password || !data.role) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Register the user
      await axios.post("http://localhost:5000/api/auth/register", data);

      // Auto-login after register
      const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      const token = loginRes.data.token;
      localStorage.setItem("token", token);

      // Get user info to determine redirect
      const userRes = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userRes.data;

      if (user.isAdmin) window.location.href = "/profile";
      else if (user.role === "photographer") window.location.href = "/profile";
      else window.location.href = "/profile";
    } catch (error) {
      alert("Registration failed. Please check your details.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">Register</h2>

      <input
        {...register("username")}
        placeholder="Username"
        className="border p-2 w-full"
        required
      />

      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        required
      />

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        required
      />

      <select {...register("role")} className="border p-2 w-full" required>
        <option value="">Select Role</option>
        <option value="client">Client</option>
        <option value="photographer">Photographer</option>
      </select>

      <button className="bg-green-600 text-white px-4 py-2 w-full">Register</button>
    </form>
  );
}
