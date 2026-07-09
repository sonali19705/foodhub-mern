import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🍕 FoodHub</h2>

      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/menu">Menu</NavLink>
        </li>

        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>

        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>

        <li>
          <NavLink to="/login">Login</NavLink>
        </li>

        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;