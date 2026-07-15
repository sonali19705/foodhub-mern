import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Admin.css";

function Admin() {

    const [stats, setStats] = useState({
        totalFoods: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalDeliveryPartners: 0,
    });

    const fetchDashboardStats = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await api.get(
                "/admin/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStats(response.data.stats);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchDashboardStats();

    }, []);

    return (

        <div className="admin-container">

            <h1>Admin Dashboard</h1>

            <div className="dashboard-grid">

                <div className="dashboard-card">
                    <h2>🍔 Total Foods</h2>
                    <h3>{stats.totalFoods}</h3>
                </div>

                <div className="dashboard-card">
                    <h2>📦 Total Orders</h2>
                    <h3>{stats.totalOrders}</h3>
                </div>

                <div className="dashboard-card">
                    <h2>👥 Customers</h2>
                    <h3>{stats.totalCustomers}</h3>
                </div>

                <div className="dashboard-card">
                    <h2>🚚 Delivery Partners</h2>
                    <h3>{stats.totalDeliveryPartners}</h3>
                </div>

            </div>

        </div>

    );

}

export default Admin;