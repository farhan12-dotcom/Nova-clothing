// pages/Home.jsx
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Hero3D from "../components/Hero3D";
import RevealText from "../components/RevealText";
import TypewriterText from "../components/TypewriterText";

export default function Home() {
  // Ab products static import nahi, hook se aa rahe hain
  const { products, loading, error } = useProducts();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-text">
          <p className="hero-eyebrow">New Season</p>
          <h1 className="hero-heading">Fashion That Moves With You</h1>
          <p className="hero-sub">
            <TypewriterText
              text="Timeless jackets. Everyday denim. Comfort you can wear anywhere."
              speed={40}
            />
          </p>
        </div>
        <div className="hero-3d">
          <Hero3D />
        </div>
      </section>

      <RevealText as="h2" text="Step into something better." />

      <h1 style={{ marginTop: "3rem" }}>All Products</h1>

      {/*
        Teen states handle karna zaroori hai — warna loading ke dauran
        products.map() try karega aur crash ho sakta hai (kyunki abhi array khali hai),
        ya error ke case mein user ko kuch pata hi nahi chalega ke kya hua.
      */}
      <div className="product-status">
      {loading && <p>Loading products...</p>}
      {error && <p>Something went wrong: {error}</p>}
      </div>

      {!loading && !error && (
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
