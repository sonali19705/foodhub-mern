import "./CategoryCard.css";

function CategoryCard({ icon, name, price }) {
  return (
    <div className="category-card">
      <h3>{icon} {name}</h3>
      <p>Starting from ₹{price}</p>
    </div>
  );
}

export default CategoryCard;