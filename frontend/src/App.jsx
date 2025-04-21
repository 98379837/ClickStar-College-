import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import BookingPage from "./pages/BookingPage";
import MessagingPage from "./pages/MessagingPage";
import ReviewPage from "./pages/ReviewPage";
import AdminPanel from "./pages/AdminPanel";
import Search from "./pages/Search";
import PhotographerProfile from "./pages/PhotographerProfile";
import EditProfile from "./pages/EditProfile";
import PhotographerDashboard from "./pages/PhotographerDashboard";
import PaymentPage from "./pages/PaymentPage";
import ClientProfile from "./pages/ClientProfilePage";
import PhotographerProfileEdit from "./pages/PhotographerProfileEdit";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/chat" element={<MessagingPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/search" element={<Search />} />
        <Route path="/photographer/:id" element={<PhotographerProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/photographer-dashboard" element={<PhotographerDashboard />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/profile-client" element={<ClientProfile />} />
        <Route path="/profile-photographer" element={<PhotographerProfileEdit />} />
        <Route path="/profile-admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
