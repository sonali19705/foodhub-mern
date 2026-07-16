import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

function CategoryCard({ category }) {

  const navigate = useNavigate();
  const icons = {
    Pizza: "🍕",
    Burger: "🍔",
    Drinks: "🥤",
    Desserts: "🍰",
  };

  const icon = icons[category] || "🍽️";

  return (

    <div
      className="category-card"
      onClick={() =>
        navigate(`/menu?category=${category}`)
      }
    >

      <div className="category-icon">
        {icon}
      </div>

      <h3>{category}</h3>

      <p>
        Explore delicious {category} dishes
      </p>

    </div>

  );

}

export default CategoryCard;