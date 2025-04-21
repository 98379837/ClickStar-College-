import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Search() {
  const [photographers, setPhotographers] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    specialization: "",
    price: "",
    rating: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const searchPhotographers = async () => {
    const res = await axios.get("http://localhost:5000/api/search", { params: filters });
    setPhotographers(res.data);
  };

  useEffect(() => {
    searchPhotographers();
  }, [filters]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Photographers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input name="location" placeholder="Location" onChange={handleChange} className="border p-2" />
        <input name="specialization" placeholder="Speciality" onChange={handleChange} className="border p-2" />
        <input name="price" placeholder="Max Price ₹" type="number" onChange={handleChange} className="border p-2" />
        <input name="rating" placeholder="Min Rating" type="number" onChange={handleChange} className="border p-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {photographers.map((p, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{p.username}</h3>
            <p>{p.specialization} • ₹{p.pricing}</p>
            <p>{p.location} • ⭐ {p.averageRating}</p>
            <div className="space-x-2 mt-2">
              <Link to={`/photographer/${p._id}`}>
                <button className="bg-blue-600 text-white px-3 py-1 rounded">View</button>
              </Link>
              <Link to={`/chat`}>
                <button className="bg-purple-600 text-white px-3 py-1 rounded">Chat</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
