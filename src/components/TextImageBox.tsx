import React from 'react';

interface TextImageBoxProps {
    imageUrl?: string;
    children: React.ReactNode;
    imageOnRight?: boolean;
    altText?: string;
}

const TextImageBox: React.FC<TextImageBoxProps> = ({ imageUrl, children, imageOnRight = false, altText = "Image"}) => {
return (
    <div className="flex flex-col sm:flex-row text-text text-lg items-start pt-5">
        {!imageOnRight && imageUrl && (
        <div className="flex-shrink-0 hidden md:block w-1/4 ml-4 mb-0 lg:mb-4">
            <img src={`${imageUrl}`} alt={altText} className="w-full max-w-[200px] h-auto rounded" />
        </div>
        )}
        <div className="flex-1 flex-col justify-between">
            {children}
        </div>
        {imageOnRight && imageUrl && (
        <div className="flex-shrink-0 hidden md:block w-1/4 ml-4 mb-0 lg:mb-4 mr-0">
            <img src={`${imageUrl}`} alt={altText} className="w-full max-w-[200px] h-auto rounded" />
        </div>
        )}
    </div>)
};

export default TextImageBox;