// hooks/useProduct.js
import { useState, useEffect } from "react";

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((item) => {
        setProduct({
          id: item.id,
          name: item.title,
          price: item.price,
          category: item.category,
          image: item.thumbnail,
          description: item.description,
          sizes: ["S", "M", "L", "XL"],
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}