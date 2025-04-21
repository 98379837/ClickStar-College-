export default function PhotographerProfileEdit() {
    const { register, handleSubmit, setValue } = useForm();
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        const { username, location, specialization, pricing } = res.data;
        setValue("username", username);
        setValue("location", location);
        setValue("specialization", specialization);
        setValue("pricing", pricing);
      });
    }, []);
  
    const onSubmit = async (data) => {
      await axios.put("http://localhost:5000/api/users/update", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated");
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold">Photographer Profile</h2>
        <input {...register("username")} placeholder="Name" className="border p-2 w-full" />
        <input {...register("location")} placeholder="Location" className="border p-2 w-full" />
        <input {...register("specialization")} placeholder="Specialization (Wedding, Portrait...)" className="border p-2 w-full" />
        <input {...register("pricing")} type="number" placeholder="Pricing ₹" className="border p-2 w-full" />
        <button className="bg-blue-600 text-white px-4 py-2">Update</button>
      </form>
    );
  }
  