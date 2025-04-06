const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

// 🔒 Simple Admin Login (no token)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.status(200).json({
      message: 'Login successful',
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🆕 Register Admin (optional)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🧪 Simple Dashboard Route (no auth)
router.get("/dashboard", async (req, res) => {
  try {
    // Here you'd normally check session or a flag if admin is authenticated
    res.status(200).json({
      message: "Welcome to the admin dashboard",
      info: "This is protected admin data"
    });
  } catch (error) {
    res.status(500).json({ message: "Error loading dashboard" });
  }
});

module.exports = router;
