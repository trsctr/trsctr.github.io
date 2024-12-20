import React from 'react';
import ContentBox from './ContentBox';
import Header from './Header';
import Footer from './Footer';
import TextImageBox from './TextImageBox'

interface AboutProps {
    title?: string;
    imageUrl?: string;
    imageOnRight?: boolean;
    children?: React.ReactNode;
}

/*
    * A component that displays an about section with an image.
    * 
    * @param title The title of the about section.
    * @param imageUrl The URL of the image to display.
    * @param imageOnRight Whether to display the image on the right side of the text box.
    * @param children The content to display in the about section.
*/
const About: React.FC<AboutProps> = ( {title, imageUrl, children, imageOnRight = false}) => {
    return (
    <div className="absolute flex left-0 top-0 md:top-1/4 md:left-32  w-full md:w-9/12 max-w-[900px]">
    <ContentBox className="rounded-lg shadow-lg">
            {title && <Header text={title} hasGradient/>}
            <TextImageBox imageUrl={imageUrl} imageOnRight={imageOnRight}>
                {children}
            </TextImageBox>
        <Footer/>
    </ContentBox>
    </div>
    );
  };

  export default About;