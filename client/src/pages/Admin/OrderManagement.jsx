import { useEffect, useState } from "react";
import api from "../../services/api";
import "./OrderManagement.css";

function OrderManagement() {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await api.get(
                "/orders/admin",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOrders(response.data.orders);

        } catch (error) {

            console.error(error);

        }

    };
    const updateStatus = async (orderId, orderStatus) => {

        const token = localStorage.getItem("token");

        try {

            const response = await api.put(
                `/orders/admin/${orderId}`,
                { orderStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            fetchOrders();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };
    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <div className="order-management">

            <h1>Order Management</h1>

            {orders.map((order) => (

                <div
                    key={order._id}
                    className="order-card"
                >

                    <h3>
                        Order ID:
                        {" "}
                        {order._id}
                    </h3>

                    <p>
                        <strong>Customer:</strong>
                        {" "}
                        {order.user.name}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        {" "}
                        {order.user.email}
                    </p>

                    <p>
                        <strong>Total:</strong>
                        {" "}
                        ₹{order.totalAmount}
                    </p>

                    <div className="status-box">

                        <strong>Status:</strong>

                        <select
                            value={order.orderStatus}
                            onChange={(e) =>
                                updateStatus(order._id, e.target.value)
                            }
                        >

                            <option value="Pending">Pending</option>

                            <option value="Preparing">Preparing</option>

                            <option value="Out for Delivery">
                                Out for Delivery
                            </option>

                            <option value="Delivered">Delivered</option>

                            <option value="Cancelled">Cancelled</option>

                        </select>

                    </div>

                    <hr />

                    <h4>Items</h4>

                    {order.items.map((item) => (

                        <p key={item.food._id}>

                            {item.food.name}

                            {" × "}

                            {item.quantity}

                        </p>

                    ))}

                </div>

            ))}

        </div>

    );

}

export default OrderManagement;