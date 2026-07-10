import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Cart.css";

function Cart() {

  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(response.data.cart.items);

    } catch (error) {
      console.error(error);
    }
  };
  const updateQuantity = async (foodId, quantity) => {
    const token = localStorage.getItem("token");

    try {
      await api.put(
        `/cart/${foodId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();

    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const removeCartItem = async (foodId) => {
    const token = localStorage.getItem("token");

    try {
      await api.delete(`/cart/${foodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();

    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");

    try {
      await api.delete("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();

    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.food._id} className="cart-item">

              <img
                src={item.food.image}
                alt={item.food.name}
                className="cart-image"
              />

              <div className="cart-content">

                <h2>{item.food.name}</h2>

                <p className="description">
                  {item.food.description}
                </p>

                <p className="price">
                  Price : ₹{item.food.price}
                </p>

                <div className="quantity-box">

                  <button
                    disabled={item.quantity === 1}
                    onClick={() =>
                      updateQuantity(item.food._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.food._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                </div>

                <p className="subtotal">
                  Subtotal : ₹{item.food.price * item.quantity}
                </p>

              </div>

              <button
                className="remove-btn"
                onClick={() => removeCartItem(item.food._id)}
              >
                Remove
              </button>

            </div>
          ))}

          <div className="cart-summary">

            <h2>
              Grand Total : ₹
              {cart.reduce(
                (total, item) =>
                  total + item.food.price * item.quantity,
                0
              )}
            </h2>

            <div className="cart-footer">

              <button
                className="clear-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>

              <button className="checkout-btn">
                Proceed to Checkout
              </button>

            </div>

          </div>

        </>
      )}
    </div>
  );
}

export default Cart;