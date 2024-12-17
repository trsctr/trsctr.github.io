import React from 'react';

interface ContentBoxProps {
    background?: string;
    className?: string;
    children: React.ReactNode
}

const ContentBox: React.FC<ContentBoxProps> = ({ background = "bg-background", className, children }) => {
  return (
    <section className={`${background} relative p-4 flex justify-center ${className}`}>
      {/* Content Box */}
      <div className="w-full">
        {children}
      </div>
    </section>
  );
};



export default ContentBox;