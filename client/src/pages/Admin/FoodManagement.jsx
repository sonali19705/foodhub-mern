import { useEffect, useState } from "react";
import api from "../../services/api";
import "./FoodManagement.css";

function FoodManagement() {

    const [foods, setFoods] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [editingFoodId, setEditingFoodId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
    });
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };
    const addFood = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await api.post(
                "/foods",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            setShowModal(false);

            setFormData({
                name: "",
                description: "",
                price: "",
                image: "",
                category: "",
            });

            fetchFoods();

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Something went wrong");

        }

    };
    const updateFood = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await api.put(
                `/foods/${editingFoodId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            setShowModal(false);

            setIsEdit(false);

            setEditingFoodId(null);

            setFormData({
                name: "",
                description: "",
                price: "",
                image: "",
                category: "",
            });

            fetchFoods();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };
    const editFood = (food) => {

        setIsEdit(true);

        setEditingFoodId(food._id);

        setFormData({
            name: food.name,
            description: food.description,
            price: food.price,
            image: food.image,
            category: food.category,
        });

        setShowModal(true);

    };
    const deleteFood = async (foodId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this food?"
        );

        if (!confirmDelete) {
            return;
        }

        const token = localStorage.getItem("token");

        try {

            const response = await api.delete(
                `/foods/${foodId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            fetchFoods();

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Something went wrong");

        }
    };
    const fetchFoods = async () => {

        try {

            const response = await api.get("/foods");

            setFoods(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {
        fetchFoods();
    }, []);
    console.log("deleteFood:", deleteFood);
    return (

        <div className="food-management">

            <div className="food-header">

                <h1>Food Management</h1>

                <button
                    className="add-food-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Add Food
                </button>
                {showModal && (

                    <div className="modal-overlay">

                        <div className="food-modal">

                            <h2>
                                {isEdit ? "Edit Food" : "Add Food"}
                            </h2>

                            <input
                                type="text"
                                name="name"
                                placeholder="Food Name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={handleChange}
                            />

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Burger">Burger</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Desserts">Desserts</option>
                            </select>

                            <div className="modal-buttons">

                                <button
                                    onClick={isEdit ? updateFood : addFood}
                                >
                                    {isEdit ? "Update" : "Save"}
                                </button>

                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        setShowModal(false);
                                        setIsEdit(false);
                                        setEditingFoodId(null);
                                        setFormData({
                                            name: "",
                                            description: "",
                                            price: "",
                                            image: "",
                                            category: "",
                                        });
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                )}
            </div>

            <div className="food-grid">

                {foods.map((food) => (

                    <div
                        key={food._id}
                        className="food-card"
                    >

                        <img
                            src={food.image}
                            alt={food.name}
                        />

                        <h3>{food.name}</h3>

                        <p>{food.description}</p>

                        <h4>₹{food.price}</h4>

                        <div className="food-actions">

                            <button
                                className="edit-btn"
                                onClick={() => editFood(food)}
                            >
                                Edit
                            </button>

                            <button className="delete-btn"
                                onClick={() => deleteFood(food._id)}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default FoodManagement;