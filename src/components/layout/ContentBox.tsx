import React from 'react';
import Header from '../common/Header';

interface ContentBoxProps {
    children?: React.ReactNode;
    divStyle?: string;
    sectionStyle?: string;
}

/*
    * A component that displays an about section with an image.
    * 
    * @param title The title of the about section.
    * @param imageUrl The URL of the image to display.
    * @param imageOnRight Whether to display the image on the right side of the text box.
    * @param children The content to display in the about section.
*/
const ContentBox: React.FC<ContentBoxProps> = ( {title, children, divStyle, sectionStyle}) => {
    // "md:absolute flex left-0 top-0 md:top-1/4 md:left-32 w-full md:w-9/12 max-w-[900px]"

    return (
    <div className={divStyle}>
    
    <section className={sectionStyle}>
      {/* Content Box */}
        <div className="w-full flex-col">
            {children}
        </div>
    </section>
    </div>
    );
};

export default ContentBox;