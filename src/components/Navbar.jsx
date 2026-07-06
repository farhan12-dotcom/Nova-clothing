// components/Navbar.jsx
//
// Layout badla: pehle sab links ek hi group mein the (right side pe chale jate the
// space-between ki wajah se). Ab do groups banaye hain — "navbar-left" (logo +
// main nav links) aur "navbar-right" (cart + auth) — dono independent flex groups.

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      {/* LEFT group — logo + main navigation links, sab ek sath */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          NOVA
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      {/* RIGHT group — cart + auth, dusri taraf */}
      <div className="navbar-right">
        <Link to="/cart" className="navbar-cart">
          Cart ({totalItems})
        </Link>

        {currentUser ? (
          <>
            <span className="navbar-user">Hi, {currentUser.name}</span>
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          // navbar-links class use ki — same class jo Home/Shop/About/Contact
          // pe hai, isliye hover pe same gold color effect milega
          <div className="navbar-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
