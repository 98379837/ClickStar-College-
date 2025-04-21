import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ClientProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUser(res.data);
      setValue("username", res.data.username);
    });
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("profilePic", data.profilePic[0]);

    await axios.put("http://localhost:5000/api/users/update", formData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Profile updated");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Client Profile</h2>
      <input {...register("username")} className="border p-2 w-full" />
      <input {...register("profilePic")} type="file" className="border p-2 w-full" />
      <button className="bg-blue-600 text-white px-4 py-2">Update</button>
      <button type="button" onClick={logout} className="bg-red-600 text-white px-4 py-2 ml-2">Logout</button>
    </form>
  );
}
