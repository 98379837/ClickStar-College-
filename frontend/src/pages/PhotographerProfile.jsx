import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PhotographerProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/profile/${id}`).then(res => setProfile(res.data));
  }, [id]);

  if (!profile) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{profile.username}</h2>
      <p>{profile.specialization}</p>
      <p>₹{profile.pricing}</p>
      <img src={profile.profilePicUrl} className="w-64 h-64 object-cover mt-4" />
    </div>
  );
}
