import React from 'react';

interface ContentBoxProps {
    background?: string;
    className?: string;
    children: React.ReactNode
}

/*
    * A component that displays a content box with a background color.
    * 
    * @param background The background color of the content box.
    * @param className Additional classes to apply to the content box.
    * @param children The content to display in the content box.
*/
const ContentBox: React.FC<ContentBoxProps> = ({ background = "bg-background", className, children }) => {
  return (
    <section className={`${background} opacity-90 relative p-4 flex justify-center ${className}`}>
      {/* Content Box */}
      <div className="w-full flex-col">
        {children}
      </div>
    </section>
  );
};

export default ContentBox;