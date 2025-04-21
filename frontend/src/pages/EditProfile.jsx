import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

export default function EditProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const { specialization, pricing, experience } = res.data;
      setValue("specialization", specialization);
      setValue("pricing", pricing);
      setValue("experience", experience);
    });
  }, []);

  const onSubmit = async (data) => {
    await axios.put("http://localhost:5000/api/profile/update", data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Profile updated");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 max-w-md mx-auto">
      <input {...register("specialization")} placeholder="Specialization" className="border p-2 w-full" />
      <input {...register("pricing")} placeholder="Pricing ₹" type="number" className="border p-2 w-full" />
      <input {...register("experience")} placeholder="Experience (years)" className="border p-2 w-full" />
      <button className="bg-blue-600 text-white px-4 py-2">Update Profile</button>
    </form>
  );
}
