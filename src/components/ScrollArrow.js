import React from 'react';
import '../css/ScrollArrow.css';


const ScrollArrow = ({ parallaxRef }) => {
  const scrollToBottom = () => {
    if (parallaxRef.current) {
      
      parallaxRef.current.scrollTo(2);
    }
  };

  return (
    <button className="arrow-button" onClick={scrollToBottom}></button>
  );
};

export default ScrollArrow;
