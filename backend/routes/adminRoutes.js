const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
require("dotenv").config();
const authenticate = require("../middleware/verifyAdminToken"); 

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// ✅ Ensure secrets are set
if (!SECRET_KEY || !REFRESH_SECRET) {
    console.error("Error: JWT_SECRET or REFRESH_SECRET is not set in environment variables.");
    process.exit(1);
}

// ✅ Register a new admin (Only run once to create an admin)
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newAdmin = new Admin({ email, password: hashedPassword, role: "admin" });
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Login Admin and Generate Tokens
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const accessToken = jwt.sign(
            { id: admin._id, role: admin.role },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { id: admin._id, role: admin.role },
            REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        admin.refreshToken = refreshToken;
        await admin.save();

        res.json({ success: true, token: accessToken, refreshToken, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Refresh Token Route
router.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Refresh Token Required" });

    try {
        const admin = await Admin.findOne({ refreshToken });
        if (!admin) return res.status(403).json({ message: "Invalid Refresh Token" });

        jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid Refresh Token" });

            const accessToken = jwt.sign(
                { id: admin._id, role: admin.role },
                SECRET_KEY,
                { expiresIn: "1h" }
            );
            
            res.json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Logout & Invalidate Refresh Token
router.post("/logout", async (req, res) => {
    const { refreshToken } = req.body;
    try {
        await Admin.updateOne({ refreshToken }, { $unset: { refreshToken: "" } });
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// ✅ Protected Admin Route Example
router.get("/dashboard", authenticate, (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard", admin: req.user });
});

module.exports = router;
