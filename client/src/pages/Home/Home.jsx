import api from "../../services/api";
import { useEffect, useState } from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import FoodCard from "../../components/FoodCard/FoodCard";

function Home() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await api.get("/foods");
                setFoods(response.data);
            } catch (error) {
                console.error("Error fetching foods:", error);
            } finally {

                setLoading(false);

            }
        };

        fetchFoods();
    }, []);

    const categories = [...new Set(foods.map(food => food.category))];

    return (
        <main className="home">

            <Hero />

            <section className="categories">

                <h2>Popular Categories</h2>

                <div className="category-grid">

                    {categories.map((category) => (

                        <CategoryCard
                            key={category}
                            category={category}
                        />

                    ))}

                </div>

            </section>

            <section className="foods">

                <h2>Popular Foods</h2>

                <div className="food-list">

                    {foods.map((food) => (
                        <FoodCard
                            key={food._id}
                            food={food}
                        />
                    ))}

                </div>

            </section>

        </main>
    );
}

export default Home;