import React, { useState, useEffect, ReactNode } from 'react';

const GradientBackground: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getGradient = () => {
        const intensity = Math.min(scrollY / 20000, 0.12);

        return `linear-gradient(${scrollY/5}deg, rgba(256,0,0,${intensity}), rgba(0,0,256,${intensity}))`;
    };

    return (
        <div style={{ background: getGradient() }}>
            {children}
        </div>
    );
};

export default GradientBackground;