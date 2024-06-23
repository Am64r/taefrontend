import React, { useEffect, useState } from 'react';
import '../css/LoadingAnimation.css';

const LoadingAnimation = () => {
    const [animationStep, setAnimationStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationStep((prevStep) => (prevStep + 1) % 3);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading">
            <div className={`block ${animationStep === 0 ? 'transformed' : ''}`}></div>
            <div className={`block ${animationStep === 1 ? 'transformed' : ''}`}></div>
            <div className={`block ${animationStep === 2 ? 'transformed' : ''}`}></div>
        </div>
    );
};

export default LoadingAnimation;
