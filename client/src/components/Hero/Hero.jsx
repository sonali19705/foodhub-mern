import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <h1>Delicious Food Delivered To Your Doorstep</h1>

      <p>
        Fresh meals prepared with love and delivered in minutes.
      </p>

      <button onClick={() => window.scrollTo({
        top: 700,
        behavior: "smooth",
      })}>
        Order Now
      </button>

    </section>
  );
}

export default Hero;