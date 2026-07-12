import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Checkout.css";

function Checkout() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");

    const subtotal = cart.reduce(
        (total, item) => total + item.food.price * item.quantity,
        0
    );

    const deliveryFee = cart.length > 0 ? 40 : 0;

    const gst = cart.length > 0 ? Math.round(subtotal * 0.05) : 0;

    const grandTotal = subtotal + deliveryFee + gst;

    const fetchCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) return;

        try {

            const response = await api.get("/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCart(response.data.cart.items);

        } catch (error) {

            console.error(error);

        }

    };
    const fetchAddresses = async () => {

        const token = localStorage.getItem("token");

        if (!token) return;

        try {

            const response = await api.get("/address", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAddresses(response.data.addresses);

        } catch (error) {

            console.error(error);

        }

    };
    const handlePlaceOrder = async () => {

        if (!selectedAddress) {

            alert("Please select a delivery address.");

            return;

        }

        const token = localStorage.getItem("token");

        try {

            const response = await api.post(
                "/orders",
                {
                    address: selectedAddress,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            navigate("/orders");
        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to place order."
            );

        }

    };
    useEffect(() => {

        fetchCart();

        fetchAddresses();


    }, []);
    return (
        <div className="checkout-container">

            <h1>Checkout</h1>

            <div className="checkout-content">

                {/* ---------------- Address ---------------- */}

                <div className="checkout-card">

                    <h2>Delivery Address</h2>

                    {addresses.length === 0 ? (

                        <p className="empty-checkout">
                            No Address Found
                        </p>

                    ) : (

                        addresses.map((address) => (

                            <label
                                key={address._id}
                                className="address-option"
                            >

                                <input
                                    type="radio"
                                    name="address"
                                    value={address._id}
                                    checked={selectedAddress === address._id}
                                    onChange={(e) =>
                                        setSelectedAddress(e.target.value)
                                    }
                                />

                                <div className="address-details">

                                    <h3>{address.fullName}</h3>

                                    <p>{address.mobile}</p>

                                    <p>
                                        {address.house}, {address.area}
                                    </p>

                                    <p>
                                        {address.city}, {address.state}
                                    </p>

                                    <p>{address.pincode}</p>

                                    {address.isDefault && (
                                        <span className="default-badge">
                                            Default
                                        </span>
                                    )}

                                </div>

                            </label>

                        ))

                    )}

                </div>

                {/* ---------------- Order Summary ---------------- */}

                <div className="checkout-card">

                    <h2>Order Summary</h2>

                    {cart.map((item) => (

                        <div
                            key={item.food._id}
                            className="checkout-item"
                        >

                            <div className="item-left">

                                <img
                                    src={item.food.image}
                                    alt={item.food.name}
                                />

                                <div className="item-info">

                                    <h3>{item.food.name}</h3>

                                    <p>
                                        Qty : {item.quantity}
                                    </p>

                                </div>

                            </div>

                            <h3 className="item-price">
                                ₹{item.food.price * item.quantity}
                            </h3>

                        </div>

                    ))}

                    <div className="summary-row">

                        <span>Subtotal</span>

                        <span>₹{subtotal}</span>

                    </div>

                    <div className="summary-row">

                        <span>Delivery Fee</span>

                        <span>₹{deliveryFee}</span>

                    </div>

                    <div className="summary-row">

                        <span>GST (5%)</span>

                        <span>₹{gst}</span>

                    </div>

                    <div className="summary-total">

                        <span>Grand Total</span>

                        <span>₹{grandTotal}</span>

                    </div>

                    <div className="payment-method">

                        <label>

                            <input
                                type="radio"
                                checked
                                readOnly
                            />

                            Cash on Delivery

                        </label>

                    </div>

                    <button
                        className="place-order-btn"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Checkout;