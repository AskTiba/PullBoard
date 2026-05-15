import React from 'react';

const Analytics = ({ width = 24, fill = 'currentColor', className = '' }) => (
  <svg width={width} height={width} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M21 21H3V3" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 14L11 10L15 14L21 8" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Analytics;
