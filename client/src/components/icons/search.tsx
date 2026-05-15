import React from "react";

const Search: React.FC<{ width?: number; height?: number; className?: string; fill?: string }> = ({
  width = 24,
  height = 24,
  className = "",
  fill = "currentColor",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default Search;
