// components/RevealText.jsx
// Reusable component — jab bhi ye scroll karke screen mein aaye,
// text neeche se upar fade + slide karke appear hota hai.

import { motion } from "framer-motion";

export default function RevealText({ text, as: Tag = "p" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // 100px pehle hi trigger ho jaye
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Tag>{text}</Tag>
    </motion.div>
  );
}
