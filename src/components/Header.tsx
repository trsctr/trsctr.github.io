import React from 'react';

interface HeaderProps {
    text: string;
    color?: string;
    gradientColors?: string;
    className?: string;
    hasGradient?: boolean;
    textSize?: string;
}

/*
    * A component that displays a header with optional gradient text.
    * 
    * @param text The text to display in the header.
    * @param color The color of the text.
    * @param gradientColors The gradient colors to apply to the text.
    * @param className Additional classes to apply to the header.
    * @param hasGradient Whether to apply a gradient to the text.
    * @param textSize The size of the text.
*/
const Header: React.FC<HeaderProps> = ({ text, color = "text-text", gradientColors, className, hasGradient = false, textSize = "text-4xl lg:text-6xl" }) => {
    // tsekkaa clsx
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