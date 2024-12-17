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

const About: React.FC<AboutProps> = ( {title, imageUrl, children, imageOnRight = false}) => {
    return (
    <div className="absolute left-0 top-0 md:top-1/4 md:left-32  w-full md:w-9/12 max-w-[900px]">
    <ContentBox className="rounded-lg shadow-lg">
            {title && <Header text={title} gradientColors="from-primary to-secondary" hasGradient/>}
            <TextImageBox imageUrl={imageUrl} imageOnRight={imageOnRight}>
                {children}
            </TextImageBox>
    <Footer/>
    </ContentBox>
    </div>
    );
  };

  export default About;