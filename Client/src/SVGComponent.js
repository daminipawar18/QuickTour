import React from "react";

const SVGComponent = () => {
  const pathData = "M10 10 H 90 V 90 H 10 Z"; // Example path

  return (
    <svg viewBox="0 0 100 100" width="100" height="100">
      <path d={pathData} fill="none" stroke="black" strokeWidth="2" />
    </svg>
  );
};

export default SVGComponent;
