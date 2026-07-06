// components/TypewriterText.jsx
//
// Naya concept: setInterval ke sath useEffect — har X milliseconds baad
// ek naya letter text mein add karte hain, jab tak poora text na aa jaye.

import { useState, useEffect } from "react";

export default function TypewriterText({ text, speed = 50, className = "" }) {
  // displayedText — abhi tak jitne letters "type" ho chuke hain
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
   
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedText(""); // agar text prop badle to restart karo
    let index = 0;

    // setInterval — har "speed" milliseconds baad ye function chalega
    const intervalId = setInterval(() => {
      if (index < text.length) {
        // text.slice(0, index + 1) — string ka shuru se index tak hissa
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        // pura text aa gaya, interval band kar do — warna hamesha chalta rahega
        clearInterval(intervalId);
      }
    }, speed);

    // cleanup — component unmount ho ya text badle to purana interval hata do,
    // warna do intervals ek sath chalne lagenge (bug)
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {/* blinking cursor — CSS animation se "|" ko blink karwayenge */}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}
