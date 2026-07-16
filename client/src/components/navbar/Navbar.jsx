import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => {
          if (isAdmin) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }}
      >
        <img src={logo} alt="FoodHub Logo" />

        <h2>FoodHub</h2>
      </div>

      <ul className="nav-links">

        {isAdmin ? (
          <>
            <li>
              <NavLink to="/admin">
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/foods">
                Foods
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/orders">
                Orders
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>

            <li>
              <NavLink to="/cart">
                Cart
              </NavLink>
            </li>

            <li>
              <NavLink to="/orders">
                Orders
              </NavLink>
            </li>
          </>
        )}

        {token ? (
          <li>
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/login">
                Login
              </NavLink>
            </li>

            <li>
              <NavLink to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}
export default Navbar;