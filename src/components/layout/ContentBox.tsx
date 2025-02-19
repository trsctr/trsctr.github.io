import React from 'react';

/**
 * ContentBoxProps
 * 
 * Props for the ContentBox component.
 */
interface ContentBoxProps {
    children: React.ReactNode;  // Assuming children will always be passed
    containerClassName?: string;  // Renaming divStyle for clarity
    contentClassName?: string;    // Renaming sectionStyle for clarity
}

/**
 * ContentBox Component
 * 
 * A component that displays a content box with customizable styles for its container and content.
 * 
 * Props:
 * - `containerClassName` (string): The class names for the outer container div (handles horizontal placement, size, etc.).
 * - `contentClassName` (string): The class names for the section, handles color, padding, etc.
 * - `children` (ReactNode): The content to display inside the content box.
 */
const ContentBox: React.FC<ContentBoxProps> = ({ children, containerClassName, contentClassName }) => {
    return (
        <div className={containerClassName}>
            <section className={contentClassName}>
                <div className="w-full flex-col">
                    {children}
                </div>
            </section>
        </div>
    );
};

export default ContentBox;
