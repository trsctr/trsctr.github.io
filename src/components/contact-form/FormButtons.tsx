import React from "react";
import Button from '../common/Button'
import { cn } from '../../utils/cn'

interface ButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    label?: string;
    className?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ onClick, type = "button", label = "Button", className = "" }) => {
    return (
        <Button
            type={type}
            className={cn(
                `text-black border-primary bg-secondary
                hover:bg-accent hover:border-secondary
                focus:ring-2 focus:outline-none focus:ring-blue-300`, className)}
            onClick={onClick}
            label={label}>
        </Button>
    );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ onClick, type = "button", label = "Button", className = ""}) => {
    return (
        <Button
            type={type}
            className={cn(`
                border-gray-600
                bg-transparent hover:bg-background-top
                focus:ring-2 focus:outline-none focus:ring-gray-200`, className)}
            onClick={onClick}
            label={label}>
        </Button>
    
    );
};