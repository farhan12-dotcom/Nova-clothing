// pages/ProductDetail.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // useNavigate — programmatically kisi page pe bhejne ke liye
  // (Link ki tarah click se nahi, function call se navigate karta hai)
  const navigate = useNavigate();

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (error) return <p style={{ padding: "2rem" }}>Product not found.</p>;
  if (!product) return null;

  function handleAddToCart() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  // NAYA function — cart mein add karo AUR turant checkout pe navigate karo.
  // Farq "Add to Bag" se: wahan user cart mein rehta hai, yahan seedha
  // checkout pe chala jata hai — jaise "Buy Now" wale flow hote hain.
  function handleOrderNow() {
    addItem(product);
    navigate("/checkout");
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-detail-image" />

      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <p>Category: {product.category}</p>
        <p>{product.description}</p>

        {/* <div className="product-detail-sizes">
          <p>Available sizes:</p>
          {product.sizes.map((size) => (
            <span key={size} className="size-badge">
              {size}
            </span>
          ))}
        </div>*/}

        {/* Dono buttons ek sath — do alag actions */}
        <div className="product-detail-actions">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            {added ? "Added ✓" : "Add to Bag"}
          </button>
          <button className="order-now-btn" onClick={handleOrderNow}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
