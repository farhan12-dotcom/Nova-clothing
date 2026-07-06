// data/products.js
//
// picsum.photos — bohot reliable, globally fast image CDN. Random stock
// photos deta hai (clothes/shoes ki exact photo nahi, seed number se
// consistent random image milti hai). Practice project ke liye best
// balance hai reliability vs setup-complexity ka.
//
// Jab real project banao, to real product photography use karna —
// ye sirf abhi ke liye placeholder hai.

const img = (seed) => `https://picsum.photos/seed/${seed}/600/750`;

export const products = [
  { id: 1, name: "Classic Denim Jacket", price: 79.99, category: "Outerwear", image: img("denim-jacket-1"), sizes: ["S", "M", "L", "XL"] },
  { id: 2, name: "White Sneakers", price: 64.99, category: "Shoes", image: img("white-sneakers-2"), sizes: [39, 40, 41, 42, 43] },
  { id: 3, name: "Black Hoodie", price: 45.5, category: "Tops", image: img("black-hoodie-3"), sizes: ["S", "M", "L", "XL"] },
  { id: 4, name: "Slim Fit Chinos", price: 55.0, category: "Bottoms", image: img("chinos-4"), sizes: [28, 30, 32, 34, 36] },
  { id: 5, name: "Leather Belt", price: 29.99, category: "Accessories", image: img("belt-5"), sizes: ["One Size"] },
  { id: 6, name: "Graphic T-Shirt", price: 24.99, category: "Tops", image: img("tshirt-6"), sizes: ["S", "M", "L", "XL"] },
  { id: 7, name: "Running Shoes", price: 89.99, category: "Shoes", image: img("running-shoes-7"), sizes: [39, 40, 41, 42, 43, 44] },
  { id: 8, name: "Wool Beanie", price: 18.0, category: "Accessories", image: img("beanie-8"), sizes: ["One Size"] },
  { id: 9, name: "Cargo Pants", price: 62.0, category: "Bottoms", image: img("cargo-9"), sizes: [28, 30, 32, 34, 36] },
  { id: 10, name: "Bomber Jacket", price: 95.0, category: "Outerwear", image: img("bomber-10"), sizes: ["S", "M", "L", "XL"] },
  { id: 11, name: "Canvas Tote Bag", price: 22.5, category: "Accessories", image: img("tote-11"), sizes: ["One Size"] },
  { id: 12, name: "Striped Polo Shirt", price: 38.0, category: "Tops", image: img("polo-12"), sizes: ["S", "M", "L", "XL"] },
];

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}