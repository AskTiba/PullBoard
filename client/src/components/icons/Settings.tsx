import React from 'react';

const Settings = ({ width = 24, fill = 'currentColor', className = '' }) => (
  <svg width={width} height={width} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15L21.1 13.3C21.5 12.9 21.5 12.1 21.1 11.7L19.4 10C19.2 9.8 19.1 9.5 19.1 9.2V6.9C19.1 6.3 18.6 5.8 18 5.8H15.7C15.4 5.8 15.1 5.7 14.9 5.5L13.2 3.8C12.8 3.4 12 3.4 11.6 3.8L9.9 5.5C9.7 5.7 9.4 5.8 9.1 5.8H6.8C6.2 5.8 5.7 6.3 5.7 6.9V9.2C5.7 9.5 5.6 9.8 5.4 10L3.7 11.7C3.3 12.1 3.3 12.9 3.7 13.3L5.4 15C5.6 15.2 5.7 15.5 5.7 15.8V18.1C5.7 18.7 6.2 19.2 6.8 19.2H9.1C9.4 19.2 9.7 19.3 9.9 19.5L11.6 21.2C12 21.6 12.8 21.6 13.2 21.2L14.9 19.5C15.1 19.3 15.4 19.2 15.7 19.2H18C18.6 19.2 19.1 18.7 19.1 18.1V15.8C19.1 15.5 19.2 15.2 19.4 15Z" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Settings;
