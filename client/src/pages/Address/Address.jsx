import "./Address.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        house: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
    });

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

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            if (editingId) {
                await api.put(`/address/${editingId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                alert("Address Updated Successfully");
            } else {
                await api.post("/address", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                alert("Address Added Successfully");
            }

            setFormData({
                fullName: "",
                mobile: "",
                house: "",
                area: "",
                city: "",
                state: "",
                pincode: "",
            });

            setEditingId(null);
            setShowForm(false);

            fetchAddresses();
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    const editAddress = (address) => {
        setEditingId(address._id);

        setFormData({
            fullName: address.fullName,
            mobile: address.mobile,
            house: address.house,
            area: address.area,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
        });

        setShowForm(true);
    };

    const deleteAddress = async (id) => {
        const token = localStorage.getItem("token");

        try {
            await api.delete(`/address/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Address Deleted Successfully");

            fetchAddresses();
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="address-container">
            <h1>My Addresses</h1>

            <button
                className="add-btn"
                onClick={() => {
                    setShowForm(true);
                    setEditingId(null);

                    setFormData({
                        fullName: "",
                        mobile: "",
                        house: "",
                        area: "",
                        city: "",
                        state: "",
                        pincode: "",
                    });
                }}
            >
                + Add New Address
            </button>

            {showForm && (
                <form className="address-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="house"
                        placeholder="House / Flat No."
                        value={formData.house}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="area"
                        placeholder="Area"
                        value={formData.area}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                    />

                    <div className="form-buttons">
                        <button type="submit">
                            {editingId ? "Update Address" : "Save Address"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditingId(null);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {addresses.length === 0 ? (
                <p className="empty-address">No Address Found</p>
            ) : (
                <>
                    {addresses.map((address) => (
                        <div key={address._id} className="address-card">
                            
                            <h3>{address.fullName}</h3>

                            <p className="mobile">
                                📞 {address.mobile}
                            </p>

                            <p className="full-address">
                                {address.house}, {address.area}
                                <br />
                                {address.city}, {address.state} - {address.pincode}
                            </p>

                            {address.isDefault && (
                                <span className="default-badge">
                                    Default
                                </span>
                            )}

                            <div className="address-actions">
                                <button
                                    onClick={() => editAddress(address)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteAddress(address._id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="checkout-section">
                        <button
                            className="checkout-btn"
                            onClick={() => navigate("/checkout")}
                        >
                            Continue to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Address;