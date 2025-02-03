import React from 'react';
import { cn } from '../../utils/cn';

/**
 * ButtonProps
 * 
 * Interface for the props of the Button components.
 * See Button component for more details.
 */
export interface ButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    label?: string;
    className?: string;
    disabled?: boolean;
}

/**
 * Button Component
 * 
 * A basic button component for rendering buttons
 * 
 * Features:
 * - Customizable text and styles.
 * - Optional onClick handler.
 * 
 * Props (all optional):
 * - `onClick` ()=>void: Function to be executed on click;
 * - `type` 'button' | 'submit' | 'reset': type of the button
 * - `label` string: Text on the button, for example "Click Me"
 * - `className` string: Custom tailwind styles 
 */
const Button: React.FC<ButtonProps> = ({ 
    onClick = ()=>{},
    type = "button",
    label = "Button",
    className = "",
    disabled = false
}) => {
    return (
        <button
            type={type}
            className={cn(`rounded-lg px-5 py-2.5 border border-black transition-color delay-75
                        text-text font-medium text-sm text-center`,
                        className, 
                        disabled ? 'cursor-not-allowed opacity-50 bg-gray-600 hover:bg-gray-600 text-white border-0' : '')}
            onClick={onClick}
            disabled={disabled}>
            {label}
        </button>
    );
}

export default Button;
