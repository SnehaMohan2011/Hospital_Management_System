require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const Appointment = require("./models/AppointmentModel");



console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("REFRESH_SECRET:", process.env.REFRESH_SECRET);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Ensure Required ENV Variables Exist
const { MONGO_URI, SMTP_HOST, SMTP_USER, SMTP_PASS, RECEIVER_EMAIL, PORT } = process.env;

if (!MONGO_URI || !SMTP_HOST || !SMTP_USER || !SMTP_PASS || !RECEIVER_EMAIL) {
    console.error("❌ Missing environment variables. Check .env file!");
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

// ✅ Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 587, // Standard SMTP port
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false, // Prevents SSL issues
    },
});

// ✅ Verify SMTP Connection
transporter.verify((error) => {
    if (error) {
        console.error("❌ SMTP Connection Error:", error);
    } else {
        console.log("✅ SMTP Server Ready to Send Emails");
    }
});

// ✅ API Endpoint to Send Appointment Email
app.post("/send-email", async (req, res) => {
    const { name, email, phone, gender, age, department, doctor, date, time } = req.body;

    if (!name || !email || !phone || !department || !doctor || !date || !time) {
        return res.status(400).json({ message: "Missing required appointment details!" });
    }
    try{
         // ✅ Save Appointment in MongoDB
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

Please confirm the appointment with the Hospital.

Your appointment with ${doctor} on ${date} at ${time} has been confirmed.\n\n
Thank you!

Best regards,  
Sneharika Hospital`
    };
        await transporter.sendMail(mailOptions);
        console.log("✅ Email Sent Successfully");
        res.status(200).json({ message: "Appointment details sent to your email!" });
    } catch (error) {
        console.error("❌ Email Sending Error:", error);
        res.status(500).json({ message: "Error sending email.", error: error.message });
    }
});

// ✅ Admin Routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

// ✅ Start the Server
const SERVER_PORT = PORT || 5001;
app.listen(SERVER_PORT, () => console.log(`🚀 Server running on port ${SERVER_PORT}`));
