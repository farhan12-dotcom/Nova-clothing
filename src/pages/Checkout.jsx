// pages/Checkout.jsx
// Ab teen steps: Address (naam+pata), Payment Method select, aur Payment details
// (agar card select ho). Ek naya concept: "payment method" ke hisaab se
// konditionally alag fields dikhana.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const steps = ["Address", "Payment Method", "Confirm"];

export default function Checkout() {
  const { items, totalPrice, removeItem } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Address form fields
  const [address, setAddress] = useState({ name: "", street: "", city: "", zip: "" });
  // Payment method — "card", "cod" (cash on delivery), ya "paypal"
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  function updateAddress(field, value) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }

  function handleNext(e) {
    e.preventDefault();
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      items.forEach((item) => removeItem(item.id));
      setOrderPlaced(true);
    }
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <h1>Thank you, {address.name || "friend"}!</h1>
        <p>
          Your order will be delivered to {address.street}, {address.city}.
          Payment method: {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "paypal" ? "PayPal" : "Card"}.
        </p>
        <button onClick={() => navigate("/") } className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-steps">
        {steps.map((label, index) => (
          <span key={label} className={index === step ? "step active" : "step"}>
            {index + 1}. {label}
          </span>
        ))}
      </div>

      <form onSubmit={handleNext} className="checkout-form">
        {/* Step 0: Address */}
        {step === 0 && (
          <>
            <label>
              Full Name
              <input
                type="text"
                required
                value={address.name}
                onChange={(e) => updateAddress("name", e.target.value)}
                placeholder="Your Name"
              />
            </label>
            <label>
              Street Address
              <input
                type="text"
                required
                value={address.street}
                onChange={(e) => updateAddress("street", e.target.value)}
                placeholder="House / Street"
              />
            </label>
            <div className="form-row">
              <label>
                City
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => updateAddress("city", e.target.value)}
                  placeholder="City"
                />
              </label>
              <label>
                ZIP / Postal Code
                <input
                  type="text"
                  required
                  value={address.zip}
                  onChange={(e) => updateAddress("zip", e.target.value)}
                  placeholder="00000"
                />
              </label>
            </div>
          </>
        )}

        {/* Step 1: Payment Method — radio-style clickable cards */}
        {step === 1 && (
          <div className="payment-options">
            {[
              { id: "card", label: "Credit / Debit Card" },
              { id: "paypal", label: "PayPal" },
              { id: "cod", label: "Cash on Delivery" },
            ].map((option) => (
              <label
                key={option.id}
                className={
                  paymentMethod === option.id ? "payment-option selected" : "payment-option"
                }
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.id}
                  checked={paymentMethod === option.id}
                  onChange={() => setPaymentMethod(option.id)}
                />
                {option.label}
              </label>
            ))}

            {/* Sirf card select hone par card fields dikhao */}
            {paymentMethod === "card" && (
              <>
                <label>
                  Card Number
                  <input type="text" required placeholder="4242 4242 4242 4242" />
                </label>
                <div className="form-row">
                  <label>
                    Expiry
                    <input type="text" required placeholder="MM/YY" />
                  </label>
                  <label>
                    CVC
                    <input type="text" required placeholder="123" />
                  </label>
                </div>
              </>
            )}
            <p className="checkout-note">Demo only — no real payment is processed.</p>
          </div>
        )}

        {/* Step 2: Confirm — order summary review */}
        {step === 2 && (
          <div>
            <p><strong>Deliver to:</strong> {address.name}, {address.street}, {address.city} {address.zip}</p>
            <p><strong>Payment:</strong> {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "paypal" ? "PayPal" : "Card"}</p>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  {item.name} × {item.qty} — ${(item.price * item.qty).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="checkout-total">Total: ${totalPrice.toFixed(2)}</p>

        <button type="submit">
          {step < steps.length - 1 ? "Continue" : "Place Order"}
        </button>
      </form>
    </div>
  );
}
