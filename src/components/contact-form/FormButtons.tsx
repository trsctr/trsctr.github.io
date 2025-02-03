import React from "react";
import Button, { ButtonProps } from '../common/Button'
import { cn } from '../../utils/cn'

export const PrimaryButton: React.FC<ButtonProps> = ({ onClick, type = "button", label = "Button", className = "", disabled = false }) => {
    return (
        <Button
            type={type}
            className={cn(
                `text-black border-primary bg-primary
                hover:bg-accent hover:border-secondary
                focus:ring-2 focus:outline-none focus:ring-blue-300`, className)}
            onClick={onClick}
            disabled={disabled}
            label={label}>
        </Button>
    );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ onClick, type = "button", label = "Button", className = "", disabled = false}) => {
    return (
        <Button
            type={type}
            className={cn(`
                border-gray-600 hover:border-gray-700
                bg-transparent hover:bg-background-top
                focus:ring-2 focus:outline-none focus:ring-gray-200`, className)}
            disabled={disabled}
            onClick={onClick}
            label={label}>
        </Button>
    
    );
};