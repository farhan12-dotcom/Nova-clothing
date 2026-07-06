// components/ProductCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// `index` ek naya prop hai — Home.jsx se pass karenge taake har card ko
// pata ho wo grid mein kitne number pe hai (0, 1, 2, 3...).
// Isi number se hum stagger delay calculate karenge.
export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} // thoda pehle hi trigger ho jaye
      transition={{
        duration: 0.5,
        delay: index * 0.08, // 0.08s * har agla card = staggered/wave effect
      }}
    >
      <Link to={`/product/${product.id}`} className="product-card">
        <img src={product.image} alt={product.name} className="product-card-image" />
        <div className="product-card-info">
          <p className="product-card-name">{product.name}</p>
          <p className="product-card-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
