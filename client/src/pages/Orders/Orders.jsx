import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Orders.css";

function Orders() {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {

        const token = localStorage.getItem("token");

        if (!token) return;

        try {

            const response = await api.get("/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOrders(response.data.orders);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <div className="orders-container">

            <h1>My Orders</h1>

            {orders.length === 0 ? (

                <p className="empty-orders">
                    No Orders Found
                </p>

            ) : (

                orders.map((order) => (

                    <div
                        key={order._id}
                        className="order-card"
                    >

                        <div className="order-header">

                            <h3>
                                Order #{order._id.slice(-6)}
                            </h3>

                            <span className="status">
                                {order.orderStatus}
                            </span>

                        </div>

                        <div className="order-items">

                            {order.items.map((item) => (

                                <div
                                    key={item._id}
                                    className="order-item"
                                >

                                    <img
                                        src={item.food.image}
                                        alt={item.food.name}
                                    />

                                    <div>

                                        <h4>{item.food.name}</h4>

                                        <p>
                                            Qty : {item.quantity}
                                        </p>

                                    </div>

                                    <h4>
                                        ₹{item.food.price * item.quantity}
                                    </h4>

                                </div>

                            ))}

                        </div>

                        <div className="order-footer">

                            <div>

                                <strong>Total</strong>

                                <p>₹{order.totalAmount}</p>

                            </div>

                            <div>

                                <strong>Payment</strong>

                                <p>{order.paymentMethod}</p>

                            </div>

                            <div>

                                <strong>Ordered On</strong>

                                <p>
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default Orders;