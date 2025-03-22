import React, { useEffect, useRef, useState } from "react";

export default function Slot({ items, duration, targetIndex }) {
  const slotRef = useRef(null);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    if (!slotRef.current) return;

    // Infinite loop logic by duplicating items before & after
    const totalItems = [...items, ...items, ...items]; // Tripled for seamless looping

    let position = items.length; // Start in the middle
    const interval = setInterval(() => {
      position = (position + 1) % totalItems.length;
      slotRef.current.style.transform = `translateY(-${position * 100}px)`;
    }, 100); // Faster spin speed

    // Stop spinning after specified duration
    setTimeout(() => {
      clearInterval(interval); // Stop spinning
      const targetPosition = items.length + targetIndex; // Final result centered
      slotRef.current.style.transition = `transform 0.1s ease-out`; // Smooth stop
      slotRef.current.style.transform = `translateY(-${targetPosition * 100}px)`;

      setTimeout(() => {
        setSpinning(false); // End spinning effect
      }, 700); // Final stop timing
    }, duration);
  }, [items, duration, targetIndex]);

  return (
    <div
      className={`overflow-hidden w-[350px] h-[350px] 
      }`}
    >
      <div
        ref={slotRef}
        className="text-center text-[84px] leading-[100px]"
        style={{ paddingTop: "100px" }} // Ensure starting position in the middle
      >
        {/* Tripled items for seamless loop */}
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className={`py-1 ${
              !spinning && index === items.length + targetIndex ? "font-extrabold text-black text-[100px]" : "font-normal"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
