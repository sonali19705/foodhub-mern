import "./FoodCard.css";

function FoodCard({ image, name, price, description }) {
  return (
    <div className="food-card">

      <img src={image} alt={name} />

      <h3>{name}</h3>

      <p>{description}</p>

      <h4>₹{price}</h4>

      <button>Add to Cart</button>

    </div>
  );
}

export default FoodCard;