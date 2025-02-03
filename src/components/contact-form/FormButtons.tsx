import React from "react";
import Button, { ButtonProps } from '../common/Button'
import { cn } from '../../utils/cn'

// These components use ButtonProps interface for handling props
// If you need to extend functionality and handle more props
// consider creating an interface that extends ButtonProps

/**
 * PrimaryButton Component
 * 
 * A primary button component with primary color and hover effects.
 * 
 * Props:
 * - `onClick` (function): Function to be executed on click.
 * - `type` (string): The type of the button (default: 'button').
 * - `label` (string): The text to display on the button (default: 'Button').
 * - `className` (string): Additional styling classes to apply to the button.
 * - `disabled` (boolean): Whether the button is disabled (default: false).
 * 
 * Notes:
 * - All style props must be valid Tailwind CSS classes.
 */
export const PrimaryButton: React.FC<ButtonProps> = ({ 
    onClick, type = "button",
    label = "Button",
    className = "",
    disabled = false 
}) => {
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

/**
 * SecondaryButton Component
 * 
 * A secondary button component with secondary color and hover effects.
 * 
 * Props:
 * - `onClick` (function): Function to be executed on click.
 * - `type` (string): The type of the button (default: 'button').
 * - `label` (string): The text to display on the button (default: 'Button').
 * - `className` (string): Additional styling classes to apply to the button.
 * - `disabled` (boolean): Whether the button is disabled (default: false).
 * 
 * Notes:
 * - All style props must be valid Tailwind CSS classes.
 */
export const SecondaryButton: React.FC<ButtonProps> = ({ 
    onClick, type = "button",
    label = "Button",
    className = "",
    disabled = false 
}) => {
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