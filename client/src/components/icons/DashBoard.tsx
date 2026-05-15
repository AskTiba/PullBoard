import React from 'react';

const DashBoard = ({ width = 24, fill = 'currentColor', className = '' }) => (
  <svg width={width} height={width} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 3H3V12H10V3Z" fill={fill} fillOpacity="0.4" />
    <path d="M21 3H14V7H21V3Z" fill={fill} />
    <path d="M21 10H14V21H21V10Z" fill={fill} fillOpacity="0.4" />
    <path d="M10 15H3V21H10V15Z" fill={fill} />
  </svg>
);

export default DashBoard;
