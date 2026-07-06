// pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {motion} from "framer-motion";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      signup(form.name, form.email, form.password);
      navigate("/"); // signup successful — home pe bhej do
    } catch (err) {
      // AuthContext ka signup() function throw karta hai agar email
      // already exist karta ho — us error ko yahan catch karke dikha rahe hain
      setError(err.message);
    }
  }

  return (
    <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: 0,
          }}
        >
    <div className="auth-page">
      <h1>Create Account</h1>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Full Name
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Your Name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="At least 6 characters"
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
    </motion.div>
  );
}
