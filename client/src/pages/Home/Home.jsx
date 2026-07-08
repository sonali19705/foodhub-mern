import api from "../../services/api";
import { useEffect, useState } from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import FoodCard from "../../components/FoodCard/FoodCard";

function Home() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await api.get("/foods");
                setFoods(response.data);
            } catch (error) {
                console.error("Error fetching foods:", error);
            }
        };

        fetchFoods();
    }, []);

    const categories = [
        {
            id: 1,
            icon: "🍕",
            name: "Pizza",
            price: 299,
        },
        {
            id: 2,
            icon: "🍔",
            name: "Burger",
            price: 199,
        },
        {
            id: 3,
            icon: "🥤",
            name: "Drinks",
            price: 99,
        },
        {
            id: 4,
            icon: "🍰",
            name: "Desserts",
            price: 149,
        },
    ];

    return (
        <main className="home">

            <Hero />

            <section className="categories">

                <h2>Popular Categories</h2>

                <div className="category-list">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            icon={category.icon}
                            name={category.name}
                            price={category.price}
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
                            image={food.image}
                            name={food.name}
                            price={food.price}
                            description={food.description}
                        />
                    ))}

                </div>

            </section>

        </main>
    );
}

export default Home;