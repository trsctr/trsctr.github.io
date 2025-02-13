import React from 'react';
import { cn } from '../../utils/cn';

/**
 * FormFieldProps
 * 
 * Interface for the props of the FormField component.
 * See FormField component for more details.
 */
type FormFieldProps = {
    label: string;
    type: string;
    name: string;
    id: string;
    value?: string;
    rows?: number;
    maxChars?: number;
    required?: boolean;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * FormField Component
 * 
 * A reusable form field component with animated labels and validation styles.
 * 
 * Features:
 * - Floating label animations for a modern user interface.
 * - Validation for input types (e.g., email, text).
 * - Supports both input and textarea elements.
 * 
 * Props:
 * - `label` (string): The label text for the form field.
 * - `type` (string): The input type (e.g., "text", "email", "textarea").
 * - `name` (string): The name attribute for the form field.
 * - `id` (string): The id attribute for pairing the label with the form field.
 * - `value?` (string): The current value of the field (optional).
 * - `maxChars?` (number): The maximum number of characters allowed (default: 50).
 * - `required?` (boolean): Whether the field is required (default: false).
 * - `disabled?` (boolean): Whether the field is disabled (default: false).
 * - `onChange` (function): Callback triggered when the field value changes. It receives a `React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>`.
 */
const FormField: React.FC<FormFieldProps> = ({
    label,
    type,
    name,
    id,
    value,
    rows = 4,
    maxChars = 50,
    required = false,
    disabled = false,
    onChange
}) => {
    // Set the minimum number of characters allowed depending on the type of input
    const minChars = type === 'textarea' ? 10 : 3;
    
    return (
        <div className="relative z-0 w-full mb-5 group"> 
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    id={id}
                    rows={rows}
                    className={cn(`resize-none block valid:text-text py-2.5 px-0 w-full text-sm
                            text-gray-400 bg-transparent border-0 border-b-2 border-gray-600
                            appearance-none focus:border-accent focus:outline-none focus:ring-0 peer`,
                            disabled && 'cursor-not-allowed')}
                    onChange={onChange}
                    value={value}
                    placeholder=" "
                    required={required}
                    disabled={disabled}
                    maxLength={maxChars}
                    minLength={minChars}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    id={id}
                    pattern={type === 'email' ? ".+@.+\..+" : ".{3,50}"}
                    title={type === 'email'
                        ? "Please enter a valid email address"
                        : `${label} must be at least 3 characters long`}
                    className={cn(`peer block py-2.5 px-0 w-full text-sm text-gray-400 valid:text-text
                            bg-transparent border-0 border-b-2 border-gray-600 appearance-none
                            focus:border-accent focus:outline-none focus:ring-0`,
                            disabled && 'cursor-not-allowed')}
                    onChange={onChange}
                    value={value}
                    placeholder=" "
                    required={required}
                    disabled={disabled}
                    maxLength={maxChars}
                    minLength={minChars}
                />
            )}
            <label
                htmlFor={id}
                className={cn(`peer-focus:font-medium absolute text-sm text-gray-400 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 
                        origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
                        peer-focus:text-accent peer-placeholder-shown:scale-100
                        peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                        peer-focus:-translate-y-6`,
                        disabled && 'text-opacity-50')}
            >
            {label}
            </label>
        </div>
    );
}

export default FormField;