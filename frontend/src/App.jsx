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
import DrAshaReddy from "./Doctors/DoctorList/Cardiology/DrAshaReddy";
import DrKaranBhatia from "./Doctors/DoctorList/Cardiology/DrKaranBhatia";
import DrPriyaNair from "./Doctors/DoctorList/Cardiology/DrPriyaNair";

import DrMeeraShah from "./Doctors/DoctorList/Neurology/DrMeeraShah";
import DrArvindRao from "./Doctors/DoctorList/Neurology/DrArvindRao";
import DrSnehaPillai from "./Doctors/DoctorList/Neurology/DrSnehaPillai";
import DrNileshKumar from "./Doctors/DoctorList/Neurology/DrNileshKumar";

import DrKavyaSinha from "./Doctors/DoctorList/Pediatrics/DrKavyaSinha";
import DrNehaVerma from "./Doctors/DoctorList/Pediatrics/DrNehaVerma";
import DrRameshIyer from "./Doctors/DoctorList/Pediatrics/DrRameshIyer";
import DrVikramSolanki from "./Doctors/DoctorList/Pediatrics/DrVikramSolanki";

import DrAnjaliSuresh from "./Doctors/DoctorList/Dermatology/DrAnjaliSuresh";
import DrPrakashMenon from "./Doctors/DoctorList/Dermatology/DrPrakashMenon";
import DrReemaDas from "./Doctors/DoctorList/Dermatology/DrReemaDas";
import DrVinodKrishnan from "./Doctors/DoctorList/Dermatology/DrVinodKrishnan";

import DrArjunKapoor from "./Doctors/DoctorList/GeneralHealth/DrArjunKapoor";
import DrRohitSharma from "./Doctors/DoctorList/GeneralHealth/DrRohitSharma";
import DrSanjanaRao from "./Doctors/DoctorList/GeneralHealth/DrSanjanaRao";
import DrTanyaJoseph from "./Doctors/DoctorList/GeneralHealth/DrTanyaJoseph";


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
        <Route path="/doctors/dr-asha-reddy" element={<DrAshaReddy />} />
        <Route path="/doctors/dr-karan-bhatia" element={<DrKaranBhatia />} />
        <Route path="/doctors/dr-priya-nair" element={<DrPriyaNair />} />

        <Route path="/doctors/dr-meera-shah" element={<DrMeeraShah />} />
        <Route path="/doctors/dr-arvind-rao" element={<DrArvindRao/>} />
        <Route path="/doctors/dr-sneha-pillai" element={<DrSnehaPillai />} />
        <Route path="/doctors/dr-nilesh-kumar" element={<DrNileshKumar/>} />

        <Route path="/doctors/dr-kavya-sinha" element={<DrKavyaSinha />} />
        <Route path="/doctors/dr-neha-verma" element={<DrNehaVerma/>} />
        <Route path="/doctors/dr-ramesh-iyer" element={<DrRameshIyer />} />
        <Route path="/doctors/dr-vikram-solanki" element={<DrVikramSolanki/>} />

        <Route path="/doctors/dr-anjali-suresh" element={<DrAnjaliSuresh />} />
        <Route path="/doctors/dr-prakash-menon" element={<DrPrakashMenon/>} />
        <Route path="/doctors/dr-reema-das" element={<DrReemaDas />} />
        <Route path="/doctors/dr-vinod-krishnan" element={<DrVinodKrishnan/>} />

        <Route path="/doctors/dr-arjun-kapoor" element={<DrArjunKapoor />} />
        <Route path="/doctors/dr-rohit-sharma" element={<DrRohitSharma/>} />
        <Route path="/doctors/dr-sanjana-rao" element={<DrSanjanaRao />} />
        <Route path="/doctors/dr-tanya-joseph" element={<DrTanyaJoseph/>} />

        <Route path="/booking" element={<Bookingpage />} /> {/* Fixed case */}

        {/* ✅ 404 Not Found Page */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
