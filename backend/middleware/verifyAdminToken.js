const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: "Invalid token format." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = verified; // Attach admin details to the request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token.", error: error.message });
    }
};

module.exports = verifyAdminToken;
