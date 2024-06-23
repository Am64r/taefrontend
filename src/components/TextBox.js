import React from 'react';
import '../css/TextBox.css';

const TextBox = ({ text }) => {
  return (
    <div className="text-box-container">
      <div className="text-box">{text}</div>
    </div>
  );
};

export default TextBox;
