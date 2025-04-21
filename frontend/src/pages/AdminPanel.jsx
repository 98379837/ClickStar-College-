export default function AdminPanel() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/services", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setServices(res.data));

    axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data));
  }, []);

  const addService = async () => {
    await axios.post("http://localhost:5000/api/admin/services", { name: newService }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  const removeUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Manage Services</h3>
        <input value={newService} onChange={(e) => setNewService(e.target.value)} className="border p-2 w-full mt-2" />
        <button onClick={addService} className="bg-green-600 text-white px-4 py-2 mt-2">Add Service</button>
        <ul className="list-disc pl-5 mt-2">
          {services.map(s => <li key={s._id}>{s.name}</li>)}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Manage Users</h3>
        {users.map(u => (
          <div key={u._id} className="flex justify-between items-center border p-2 mt-2">
            <p>{u.username} ({u.role})</p>
            <button onClick={() => removeUser(u._id)} className="bg-red-500 text-white px-3 py-1">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
