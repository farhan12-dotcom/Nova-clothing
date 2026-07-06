// pages/Shop.jsx
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const { products, loading, error } = useProducts();

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Pehle categories/sizes module-level const the (kyunki products
  // static import tha, humesha available). Ab products state se aa rahe
  // hain (pehle khali array, phir fetch hone ke baad bhara), isliye
  // ye calculations bhi useMemo ke andar, products pe depend karte hue honi chahiye.
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const allSizes = useMemo(
    () => [...new Set(products.flatMap((p) => p.sizes))].sort(),
    [products]
  );

  function toggleCategory(category) {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }

  function toggleSize(size) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((size) => selectedSizes.includes(size)));
    }
    if (searchText.trim() !== "") {
      const query = searchText.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(query));
    }

    return result;
  }, [products, selectedCategories, selectedSizes, searchText]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading products...</p>;
  if (error) return <p style={{ padding: "2rem" }}>Something went wrong: {error}</p>;

  return (
    <div className="shop-page">
      <h1>Shop</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />

      <div className="shop-layout">
        <aside className="filter-panel">
          <p className="filter-title">Category</p>
          {categories.map((category) => (
            <label key={category} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              {category}
            </label>
          ))}

          <p className="filter-title" style={{ marginTop: "1.5rem" }}>
            Size
          </p>
          <div className="size-checkbox-grid">
            {allSizes.map((size) => (
              <label key={size} className="size-checkbox">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSize(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </aside>

        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p>No products match your filters.</p>
          ) : (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
