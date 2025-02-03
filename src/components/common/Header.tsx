import React from 'react';
import { cn } from '../../utils/cn';

/**
 * HeaderProps
 * 
 * Interface for the props of the Header component.
 * See Header component for more details.
 */
interface HeaderProps {
    text: string;
    color?: string;
    gradientColors?: string;
    className?: string;
    hasGradient?: boolean;
    textSize?: string;
}

/**
 * Header Component
 * 
 * A component that displays a header with optional gradient text.
 * 
 * Props:
 * - `text` (string): The text to display in the header.
 * - `color` (string): The color of the text (default: 'text-text').
 * - `gradientColors` (string): The gradient colors for the text (optional).
 * - `className` (string): Additional styling classes to apply to the header.
 * - `hasGradient` (boolean): Whether to apply a gradient to the text (default: false).
 * - `textSize` (string): The size of the text (default: 'text-4xl lg:text-6xl').
 * 
 * Notes:
 * - All style props must be valid Tailwind CSS classes, see defaults for examples.
 * - **Do not pass colors and text size in the className prop, as it will override textSize, color and gradientColors props.**
 * - Use className prop for additional styling (font weight, text alignment, kerning, etc.).
 */
const Header: React.FC<HeaderProps> = ({ 
    text, color = "text-text",
    gradientColors = "from-primary to-secondary",
    className,
    hasGradient = false,
    textSize = "text-4xl lg:text-6xl"}) => {

        return (
        <h1 className={cn(
            'font-bold pb-2',
            {
                'text-transparent bg-clip-text bg-gradient-to-r': hasGradient,
                [gradientColors || '']: hasGradient,
                [color]: !hasGradient
            },
            textSize,
            className
        )}>
            {text}
        </h1>
    );
}

export default Header;