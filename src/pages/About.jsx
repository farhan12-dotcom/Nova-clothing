// pages/About.jsx
// Simple static content page — koi state ya data fetching nahi,
// sirf JSX return kar raha hai. Har ecommerce site mein ye hota hai.
import { motion } from "framer-motion";
export default function About() {
  return (
    <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }} // thoda pehle hi trigger ho jaye
          transition={{
            duration: 0.5,
            delay: 0,
          }}
        >
    <div className="static-page">
      <h1>About Us</h1>
      <p>
        NOVA started with a simple idea — clothing and footwear that feel as
        good as they look, without the premium markup. We work directly with
        small manufacturers to keep quality high and prices fair.
      </p>
      <p>
        Every piece in our collection is chosen for comfort, durability, and
        everyday versatility. No seasonal gimmicks, just things you'll
        actually wear.
      </p>
    </div>
    </motion.div>
  );
}
