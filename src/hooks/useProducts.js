// hooks/useProducts.js
//
// dummyjson.com — is API mein clothes aur shoes dono ki proper
// categories hain (mens-shoes, womens-shoes, mens-shirts, womens-dresses, etc.),
// isliye ye ecommerce practice project ke liye zyada realistic hai.

import { useState, useEffect } from "react";

// Sirf inhi categories ko rakhna hai — API mein electronics, furniture,
// skincare jaisi bohot saari non-fashion categories bhi hain.
const FASHION_CATEGORIES = [
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-dresses",
  "womens-shoes",
  "womens-bags",
  "womens-jewellery",
  "womens-watches",
  "tops",
  "sunglasses",
];

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // limit=0 ka matlab "sab products do" (dummyjson ka apna convention)
    fetch("https://dummyjson.com/products?limit=0")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        const mapped = data.products
          // Sirf fashion categories rakho, baaki (electronics, groceries waghera) hata do
          .filter((item) => FASHION_CATEGORIES.includes(item.category))
          .map((item) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            category: item.category,
            image: item.thumbnail, // dummyjson mein "thumbnail" field hai, "image" nahi
            sizes: ["S", "M", "L", "XL"],
          }));
        setProducts(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
