import React from "react";
import { useNavigate } from "react-router-dom";
import "./Facilities.css";
import LogoImage from "../assets/logo.png";
import facility1 from "../assets/Emergency.jpeg";
import facility2 from "../assets/lab2.jpeg";
import facility3 from "../assets/maternity.jpeg";
import facility4 from "../assets/Icu.jpeg";
import facility5 from "../assets/MRI.jpeg";
import facility6 from "../assets/physiotherapy.jpeg";
import facility7 from "../assets/cancer.jpeg";
import facility8 from "../assets/pharmacy.jpeg";
const facilities = [
    { 
        image: facility1, 
        title: "24/7 Emergency Care", 
        description: "Our state-of-the-art emergency department operates 24/7, providing immediate and life-saving care for critical patients. Equipped with advanced medical technology and staffed by highly skilled doctors and paramedics, we ensure rapid response and effective treatment for medical emergencies, accidents, and trauma cases." 
    },
    { 
        image: facility2, 
        title: "Advanced Surgery", 
        description: "Our hospital features cutting-edge operation theaters equipped with the latest surgical technology. Our expert surgeons perform a wide range of procedures, including minimally invasive surgeries, orthopedic surgeries, cardiac procedures, and neurosurgery, ensuring precision, safety, and faster recovery for patients." 
    },
    { 
        image: facility3, 
        title: "Maternity Care", 
        description: "We provide comprehensive maternity care, from prenatal checkups to postnatal support. Our experienced obstetricians, midwives, and neonatal specialists ensure safe and comfortable deliveries. We offer specialized services such as high-risk pregnancy management, painless delivery options, and neonatal intensive care for newborns." 
    },
    { 
        image: facility4, 
        title: "Intensive Care Unit (ICU)", 
        description: "Our advanced Intensive Care Unit (ICU) is designed to provide critical care for severely ill patients. Equipped with life-support systems, ventilators, and continuous monitoring technology, our highly trained intensivists and nurses ensure round-the-clock supervision and emergency interventions." 
    },
    { 
        image: facility5, 
        title: "Diagnostic Services", 
        description: "Our hospital offers a full range of diagnostic services, including advanced imaging, pathology, and laboratory testing. We utilize modern equipment such as MRI, CT scans, ultrasound, X-rays, and blood analysis to provide accurate and early disease detection, ensuring timely treatment and better health outcomes." 
    },
    { 
        image: facility6, 
        title: "Physiotherapy Center", 
        description: "Our Physiotherapy Center offers rehabilitation and pain management therapies for patients recovering from injuries, surgeries, or chronic conditions. Our expert physiotherapists use personalized treatment plans, including exercise therapy, electrotherapy, and manual therapy, to restore mobility and improve overall well-being." 
    },
    { 
        image: facility7, 
        title: "Cancer Treatment", 
        description: "We provide comprehensive oncology care with cutting-edge cancer treatments, including chemotherapy, radiation therapy, immunotherapy, and surgical oncology. Our multidisciplinary team of oncologists, radiologists, and support staff work together to deliver personalized cancer care for better survival and quality of life." 
    },
    { 
        image: facility8, 
        title: "Pharmacy & Medication", 
        description: "Our 24/7 in-house pharmacy provides a wide range of medicines, medical supplies, and prescription services. We ensure that all medications are dispensed under the supervision of certified pharmacists, maintaining high standards of safety, authenticity, and patient care." 
    }
];


const Facilities = () => {
    const navigate = useNavigate();
    return (
        <div className="homepage-container">
                            {/* Header Section */}
                            <header className="header">
                                <div className="logo-container">
                                    <img src={LogoImage} alt="Sri Ramakrishna Hospital Logo" className="logo" />                     <h1>Sneharika Hospital</h1>
                                    <p>"Expertise You Can Trust"</p>
                                </div>
                
                                <div className="contact-info">
                                    <p> +91 422 350 0000 | +91 422 450 0000 | +91 7970 108 108</p>
                                    <p>  No. 395, Myleripalayam, Otthakkalmandapam, Coimbatore - 641032, Tamil Nadu, India.</p>
                                </div>
                            </header>
                

            <nav className="navbar">
                <ul>
                            <li onClick={() => navigate("/")}>Home</li>
                            <li onClick={() => navigate("/about")}>About Us</li>
                            <li onClick={() => navigate("/doctors")}>Doctors</li>
                            <li onClick={() => navigate("/facilities")}>Facilities</li>
                            <li onClick={() => navigate("/contact")}>Contact Us</li>
                            <li onClick={() => navigate("/admin/login")}>Admin Log</li>
                </ul>
            </nav>

            <div className="facilities-content">
                <h2>World-Class Medical Facilities</h2>
                <p>We offer the best medical facilities with state-of-the-art technology.</p>

                <div className="facilities-grid">
                    {facilities.map((facility, index) => (
                        <div key={index} className="facility-card">
                            <img src={facility.image} alt={facility.title} className="facility-image" />
                            <h3>{facility.title}</h3>
                            <p>{facility.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Facilities;