import React from "react";
import Button from '../common/Button'
import { cn } from '../../utils/cn'

interface FormButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    label?: string;
    className?: string;
    disabled?: boolean;
}

export const PrimaryButton: React.FC<FormButtonProps> = ({ onClick, type = "button", label = "Button", className = "", disabled = false }) => {
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

export const SecondaryButton: React.FC<FormButtonProps> = ({ onClick, type = "button", label = "Button", className = "", disabled = false}) => {
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