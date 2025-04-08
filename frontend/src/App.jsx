import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./components/frontpage";
import AboutUs from "./components/AboutUs";
import Facilities from "./components/Facilities";
import ContactUs from "./components/ContactUs";
import Bookingpage from "./booking/bookingpage"; // Fixed case
import Doctorpage from "./Doctors/doctors"; // Fixed case
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import DrJohn from "./Doctors/DoctorList/Cardiology/DrJohn";




function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<FrontPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/contact" element={<ContactUs />} />
        
        <Route path="/doctors" element={<Doctorpage />} /> {/* Fixed case */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                
        {/*Cardiology Doctor Routing*/}
        <Route path="/doctors/dr-john" element={<DrJohn />} />


        <Route path="/booking" element={<Bookingpage />} /> {/* Fixed case */}



        {/* ✅ 404 Not Found Page */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
