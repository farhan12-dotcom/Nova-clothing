// context/CartContext.jsx
import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product) {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  }

  function removeItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  // NAYA function — quantity ko directly kisi bhi number pe set karta hai.
  // Math.max(1, newQty) — qty kabhi 1 se neeche nahi jani chahiye
  // (0 ya negative karna ho to uski jagah removeItem use karo).
  function updateQty(id, newQty) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, newQty) } : item
      )
    );
  }

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  // updateQty ko value mein add karna zaroori hai, warna Cart.jsx isay
  // useCart() se access nahi kar payega.
  const value = { items, addItem, removeItem, updateQty, totalItems, totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
//eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}
