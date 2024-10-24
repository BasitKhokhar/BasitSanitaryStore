import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypingComponent = () => {
    const line1 = useRef(null); 
    const line2 = useRef(null); 
    const line3 = useRef(null); 
    useEffect(() => {
        const typed1 = new Typed(line1.current, {
            strings: ['Welcome to'], 
            typeSpeed: 100,          
            startDelay: 500,         
            showCursor: false,       
            onComplete: () => {             
                new Typed(line2.current, {
                    strings: ['Basit Sanitary Store'], 
                    typeSpeed: 100,
                    startDelay: 500,
                    showCursor: false,
                    onComplete: () => {
                        new Typed(line3.current, {
                            strings: ['Upgrade Your Space with Premium Sanitary Products'], 
                            typeSpeed: 100,
                            startDelay: 500,
                            showCursor: false,
                        });
                    },
                });
            },
        });

        // Cleanup to prevent memory leaks
        return () => {
            typed1.destroy();
        };
    }, []);

    return (
        <div className="flex flex-col justify-center text-left bg-transparent">
            <h1 className="text-4xl font-bold text-white">
                <span ref={line1}></span>
            </h1>
            <h1 className="text-4xl font-bold text-white mt-2">
                <span ref={line2}></span>
            </h1>
            <h1 className="text-2xl font-bold text-white mt-2">
                <span ref={line3}></span>
            </h1>
        </div>
    );
};

export default TypingComponent;
