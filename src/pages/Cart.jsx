// pages/Cart.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Cart() {
  // updateQty ab yahan bhi destructure karna hai
  const { items, removeItem, updateQty, totalPrice } = useCart();

  if (items.length === 0) {
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
      <div className="cart-page">
        <p>Your cart is empty.</p>
        <Link to="/">
          <button>Continue Shopping</button>
        </Link>
      </div>
      </motion.div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-info">
              <p className="cart-item-name">{item.name}</p>

              {/* Quantity control — "-" button, number, "+" button */}
              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-value">{item.qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <p className="cart-item-price">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>

            <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <p>Total: ${totalPrice.toFixed(2)}</p>
      </div>

      <Link to="/checkout" className="checkout-btn">
        Proceed to Checkout
      </Link>
    </div>
  );
}
