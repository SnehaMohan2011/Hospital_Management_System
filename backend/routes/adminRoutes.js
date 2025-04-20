const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { authMiddleware } = require("../middleware/authMiddleware");

// Register admin
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword, role: "admin" });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Log the received email and password
  console.log('Received email:', email);
  console.log('Received password:', password);

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    token,
    user: {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    },
  });
});




// GET /admin/validate
router.get("/validate", authMiddleware , async (req, res) => {
  const admin = await Admin.findById(req.user.id);
  if (!admin) return res.status(401).json({ valid: false });

  res.json({ valid: true, user: { id: admin._id, role: admin.role } });
});



// Token validator (for frontend check)
router.get("/validate", authMiddleware , (req, res) => {
  res.json({
    valid: true,
    user: {
      email: req.admin.email,
      role: "admin"
    }
  });
});


// Protected dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Dashboard access granted', admin: req.admin });
});

// Logout (clears frontend state only)
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
