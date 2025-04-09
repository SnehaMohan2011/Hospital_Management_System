require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const Appointment = require("./models/AppointmentModel");
const Booking = require('./models/Booking');

const adminRoutes = require("./routes/adminRoutes");
const appointmentRoutes = require("./routes/AppointmentRoutes");

const bookingRoutes = require("./routes/BookingRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();

// ✅ Middleware
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"], credentials: true }));
app.use(express.json());

// ✅ Load ENV Variables
const {
  MONGO_URI,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
  RECEIVER_EMAIL,
  PORT,
} = process.env;

if (!MONGO_URI || !SMTP_HOST || !SMTP_USER || !SMTP_PASS || !RECEIVER_EMAIL) {
  console.error("❌ Missing environment variables. Check your .env file!");
  process.exit(1);
}

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
  process.exit(1);
});

// ✅ Nodemailer Transport Setup
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP Error:", error);
  } else {
    console.log("✅ SMTP Server Ready");
  }
});

// ✅ Appointment Booking Email API
app.post("/send-email", async (req, res) => {
  const { name, email, phone, gender, age, department, doctor, date, time } = req.body;

  if (!name || !email || !phone || !department || !doctor || !date || !time) {
    return res.status(400).json({ message: "Missing required appointment details!" });
  }

  try {
    const newAppointment = new Appointment({ name, email, phone, gender, age, department, doctor, date, time });
    await newAppointment.save();

    const mailOptions = {
      from: RECEIVER_EMAIL,
      to: RECEIVER_EMAIL,
      subject: "New Appointment Booking - Sneharika Hospitals",
      text: `New appointment booked.

Patient Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
- Gender: ${gender}
- Age: ${age}
- Department: ${department}
- Doctor: ${doctor}
- Date: ${date}
- Time: ${time}

Your appointment with ${doctor} on ${date} at ${time} has been confirmed.

Thank you!
Sneharika Hospital`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent");
    res.status(200).json({ message: "Appointment booked and email sent!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

// ✅ Routes
app.use("/admin", adminRoutes);               // Admin login & dashboard
app.use("/appointments", appointmentRoutes);  // Appointment operations
app.use("/bookings", bookingRoutes);          // Booking logic
app.use("/doctors", doctorRoutes);            // Doctor list, availability, etc.

// ✅ Start Server
const SERVER_PORT = PORT || 5001;
app.listen(SERVER_PORT, () => {
  console.log(`🚀 Server running on port ${SERVER_PORT}`);
});
