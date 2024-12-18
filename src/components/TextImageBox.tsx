import React from 'react';

interface TextImageBoxProps {
    imageUrl?: string;
    children: React.ReactNode;
    imageOnRight?: boolean;
    altText?: string;
}

const TextImage: React.FC<Pick<TextImageBoxProps, 'imageUrl' | 'altText'>> = ({ imageUrl, altText = "Image"}) => {
    return (
        <div className="w-full sm:flex flex-shrink-0 justify-center md:block md:w-1/4 mx-4 mb-0 lg:mb-4">
        <img src={`${imageUrl}`} alt={altText} className="w-full max-w-[250px] md:max-w-[200px] mx-auto justify-center rounded" />
    </div>
    )
};

/*
    * A component that displays a text box with an image on the left or right.
    * 
    * @param imageUrl The URL of the image to display.
    * @param children The content to display in the text box.
    * @param imageOnRight Whether to display the image on the right side of the text box.
    * @param altText The alt text for the image.  
*/
const TextImageBox: React.FC<TextImageBoxProps> = ({ imageUrl, children, imageOnRight = false, altText = "Image"}) => {
return (
    <div className="flex flex-col md:flex-row text-text text-lg items-center md:items-start pt-5">
        {!imageOnRight && imageUrl && (
            <TextImage imageUrl={imageUrl} altText={altText}/>
        )}
        <div className="flex flex-1 flex-col items-start justify-start">
            {children}
        </div>
        {imageOnRight && imageUrl && (
            <TextImage imageUrl={imageUrl} altText={altText}/>
        )}
    </div>)
};



export default TextImageBox;