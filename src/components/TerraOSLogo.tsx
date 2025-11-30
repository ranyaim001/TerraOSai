import React from 'react';

interface LogoProps {
    width?: number;
    height?: number;
    className?: string;
}

export default function TerraOSLogo({ width = 40, height = 40, className = '' }: LogoProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logoGradient" x1="0" y1="100" x2="100" y2="0">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Outer Ring - Digital/Tech */}
            <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#logoGradient)"
                strokeWidth="2"
                strokeDasharray="10 5"
                opacity="0.6"
            >
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="20s"
                    repeatCount="indefinite"
                />
            </circle>

            {/* Inner Leaf/Planet Shape */}
            <path
                d="M50 15 C50 15 20 40 20 65 C20 81.5685 33.4315 95 50 95 C66.5685 95 80 81.5685 80 65 C80 40 50 15 50 15ZM50 85 C38.9543 85 30 76.0457 30 65 C30 55 45 35 50 28 C55 35 70 55 70 65 C70 76.0457 61.0457 85 50 85Z"
                fill="url(#logoGradient)"
                filter="url(#glow)"
                opacity="0.9"
            />

            {/* Circuit Lines */}
            <path
                d="M50 28 L50 85 M30 65 L70 65 M36 51 L64 79 M64 51 L36 79"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.5"
            />

            {/* Central Node */}
            <circle cx="50" cy="65" r="4" fill="white" filter="url(#glow)" />
        </svg>
    );
}
