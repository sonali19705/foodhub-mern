import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import FoodCard from "../../components/FoodCard/FoodCard";
import "./Menu.css";
import Loading from "../../components/Loading/Loading";
import EmptyState from "../../components/EmptyState/EmptyState";
import { useSearchParams } from "react-router-dom";
function Menu() {

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

  const initialCategory =
    searchParams.get("category") || "All";

  const [category, setCategory] =
    useState(initialCategory);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {

    try {

      const response = await api.get("/foods");

      setFoods(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };
  useEffect(() => {

    fetchFoods();

  }, []);

  const categories = useMemo(() => {

    const unique = [...new Set(foods.map(food => food.category))];

    return ["All", ...unique];

  }, [foods]);

  const filteredFoods = foods.filter((food) => {

    const searchMatch =
      food.name.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || food.category === category;

    return searchMatch && categoryMatch;

  });

  if (loading) {
    return <Loading />;
  }
  return (

    <div className="menu-page">

      <h1>Our Menu</h1>

      <div className="menu-controls">

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="category-buttons">

          {categories.map((cat) => (

            <button
              key={cat}
              className={
                category === cat
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory(cat)
              }
            >
              {cat}
            </button>

          ))}

        </div>

      </div>

      <div className="food-grid">

        {filteredFoods.length > 0 ? (

          filteredFoods.map((food) => (

            <FoodCard
              key={food._id}
              food={food}
            />

          ))

        ) : (

          <EmptyState
            title="No Food Found 🍕"
            message="Try another search."
          />
        )}

      </div>

    </div>

  );

}

export default Menu;