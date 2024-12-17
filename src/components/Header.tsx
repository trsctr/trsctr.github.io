import React from 'react';

interface HeaderProps {
    text: string;
    color?: string;
    gradientColors?: string;
    className?: string;
    hasGradient?: boolean;
    textSize?: string;
}

const Header: React.FC<HeaderProps> = ({ text, color = "text-text", gradientColors, className, hasGradient = false, textSize = "text-4xl lg:text-6xl" }) => {
    let gradientSettings = ""
    if (hasGradient && gradientColors)
        gradientSettings = "text-transparent bg-clip-text bg-gradient-to-r " + gradientColors;
    return (
        <h1 className={`${textSize} ${gradientSettings} ${color} font-bold leading-tight ${className}`}>
            {text}
        </h1>
    );
}

export default Header;