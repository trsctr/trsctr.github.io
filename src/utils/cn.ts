import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn
 * 
 * A utility function that merges class names using clsx and tailwind-merge.
 * 
 * Used to combine multiple class names into a single string.
 * Use default classes first and dynamic classes last, dynamic classes will overwrite matching default classes.
 *  
 * Examples:
 * - cn('text-black', 'text-red-500') => 'text-red-500'
 * - cn('text-black', disabled ? 'background-red text-white') => 'text-black opacity-50'
 */
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
}