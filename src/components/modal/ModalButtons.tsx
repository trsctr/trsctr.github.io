import React from 'react';
import { cn } from '../../utils/cn';

/**
 * ButtonProps
 * 
 * Interface for the props of the Button components.
 * See Button component for more details.
 */
interface ButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    label?: string;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, type = "button", label = "Button", className = "" }) => {
    return (
        <button
            type={type}
            className={cn('rounded-lg px-5 py-2.5 border border-black transition-color delay-75 text-text font-medium text-sm text-center', className)}
            onClick={onClick}>
            {label}
        </button>
    );
}

export const CloseButton: React.FC<ButtonProps> = ({ onClick }) => {
    return (
        <button
        type="button"
        className="
        text-gray-400 bg-transparent hover:bg-secondary hover:text-gray-900 hover:shadow-lg
        rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        onClick={onClick} >
            <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
                <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        <span className="sr-only">Close modal</span>
      </button>
    );
};

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