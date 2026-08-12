import React, { useEffect, useRef } from "react";

const SolarCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        // 🟢 1. Update the position continuously
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

        // 🟢 2. Check if hovering over a specific section
        const isHoveringSolarArea = e.target.closest('[data-solar-cursor="true"]');

        // 🟢 3. Show/Hide based on where the mouse is
        if (isHoveringSolarArea) {
          cursorRef.current.style.opacity = "1";
        } else {
          cursorRef.current.style.opacity = "0";
        }
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="solar-cursor"
      aria-hidden="true"
    >
      {/* SUN */}
      <div className="solar-sun" />

      {/* ORBIT 1 */}
      <div className="solar-orbit solar-orbit-1">
        <div className="solar-planet solar-planet-1">
          <div className="solar-planet-image" /> {/* Added missing image div */}
        </div>
      </div>

      {/* ORBIT 2 */}
      <div className="solar-orbit solar-orbit-2">
        <div className="solar-planet solar-planet-2">
          <div className="solar-planet-image" /> {/* Added missing image div */}
        </div>
      </div>

      {/* ORBIT 3 */}
      <div className="solar-orbit solar-orbit-3">
        <div className="solar-planet solar-planet-3">
          <div className="solar-planet-image" /> {/* Added missing image div */}
        </div>
      </div>
    </div>
  );
};

export default SolarCursor;