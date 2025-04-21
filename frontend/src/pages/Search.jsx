import { useEffect, useState } from "react";
import axios from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div className="p-6">
      <input value={query} onChange={(e) => setQuery(e.target.value)} className="border p-2 w-full mb-4" placeholder="Search photographers..." />
      <button onClick={search} className="bg-blue-600 text-white px-4 py-2 mb-4">Search</button>
      {results.map((p, idx) => (
        <div key={idx} className="border p-4 mb-2">
          <h3 className="text-xl">{p.username}</h3>
          <p>{p.specialization} - ₹{p.pricing}</p>
        </div>
      ))}
    </div>
  );
}
