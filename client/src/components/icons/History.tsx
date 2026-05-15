import React from 'react';

const History = ({ width = 24, fill = 'currentColor', className = '' }) => (
  <svg width={width} height={width} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 8V12L15 15" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.05 11C3.05 11 3.5 5.5 8.5 3.5C13.5 1.5 18.5 4.5 20.5 9.5C22.5 14.5 19.5 19.5 14.5 21.5C9.5 23.5 4.5 20.5 2.5 15.5" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 11H7.5V16" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default History;
