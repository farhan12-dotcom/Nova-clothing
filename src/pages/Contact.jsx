// pages/Contact.jsx
// Controlled form — har input ki value React state se aati hai,
// jaisa tumne Checkout mein address form mein practice kiya tha.

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Real app mein yahan API call hoti (email service, backend endpoint waghera).
    // Abhi ke liye sirf "sent" state set kar rahe hain (mock).
    console.log("Contact form submitted:", form);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="static-page">
        <h1>Message Sent</h1>
        <p>Thanks, {form.name}! We'll get back to you soon.</p>
      </div>
    );
  }

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
    <div className="static-page">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Name
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Your Name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Message
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="How can we help?"
          />
        </label>
        <button type="submit">Send Message</button>
      </form>
    </div>
    </motion.div>
  );
}
