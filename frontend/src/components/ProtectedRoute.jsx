import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");

    useEffect(() => {
        const verifyToken = async () => {
            try {
                if (!token) {
                    setIsAuthenticated(false);
                    return;
                }
                const response = await axios.get("http://localhost:5001/admin/dashboard", {
                    headers: { Authorization: token }
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, [token]);

    if (isAuthenticated === null) return <p>Loading...</p>; // Wait for verification

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
