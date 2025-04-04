import axios from "axios";

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("adminRefreshToken") || sessionStorage.getItem("adminRefreshToken");

    if (!refreshToken) {
        console.error("No refresh token found.");
        return null;
    }

    try {
        const response = await axios.post("http://localhost:5001/admin/refresh-token", { token: refreshToken });

        if (response.data.success) {
            const newToken = response.data.newToken;
            
            // Update token in storage
            localStorage.setItem("adminToken", newToken);
            return newToken;
        } else {
            console.error("Failed to refresh token");
            return null;
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};
