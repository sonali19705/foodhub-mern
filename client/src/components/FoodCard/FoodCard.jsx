import "./FoodCard.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function FoodCard({ food }) {
  const navigate = useNavigate();
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await api.post(
        "/cart",
        {
          food: food._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="food-card">

      <img src={food.image} alt={food.name} />

      <h3>{food.name}</h3>

      <p>{food.description}</p>

      <h4>₹{food.price}</h4>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>

    </div>
  );
}

export default FoodCard;