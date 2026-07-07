import "./Home.css";
import Hero from "../../components/Hero/Hero";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import FoodCard from "../../components/FoodCard/FoodCard";

function Home() {

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

    const foods = [
        {
            id: 1,
            image: "https://placehold.co/250x180",
            name: "Margherita Pizza",
            price: 299,
            description: "Classic cheese pizza with fresh basil."
        },
        {
            id: 2,
            image: "https://placehold.co/250x180",
            name: "Veg Burger",
            price: 199,
            description: "Loaded with fresh vegetables and cheese."
        },
        {
            id: 3,
            image: "https://placehold.co/250x180",
            name: "Cold Coffee",
            price: 149,
            description: "Chilled coffee with whipped cream."
        }
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
                            key={food.id}
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