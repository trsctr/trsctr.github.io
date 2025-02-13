import React from 'react';
import ContentBox from './layout/ContentBox';
import Footer from './layout/Footer';
import TextImageBox from './layout/TextImageBox'
import useModal from '../hooks/useModal';
import Header from './common/Header';
import { cn } from '../utils/cn';

const About: React.FC = ( ) => {
    const { toggleModal } = useModal();
    const linkStyle = 'transition-all text-primary hover:text-accent focus:text-accent';

    return (
    <ContentBox containerClassName='md:absolute flex left-0 top-0 md:top-1/4 md:left-32 w-full md:w-9/12 max-w-[900px]'
        contentClassName='bg-background opacity-80 relative p-4 flex justify-center rounded-lg shadow-lg'>
        <Header text="Hello, my name is Otto" hasGradient/>
        <TextImageBox imageUrl='/assets/photo.jpg' imageOnRight>        
            <p className="mb-2">I'm an aspiring software developer with a background in audio engineering and tech support, passionate about creative coding.</p>
            <p>I recently completed my core studies at <a href="http://hive.fi" className={linkStyle} target="_blank">Hive Helsinki</a>, where I gained hands-on experience in programming with C and C++. </p>
            <p className="mt-2">I built this page so I could have some fun with React, Tailwind, and Three.js, and showcase my projects in the future.</p>
            <p className="mt-2">Hope you like what you see! Feel free to interact with that mesh, check out my work and connect with me on LinkedIn or GitHub.</p>
            <p className="mt-2">Photo by <a href="https://www.instagram.com/diego_j_videos_and_photography/" className={linkStyle} target="_blank">Diego James</a>.</p>
        </TextImageBox>
        <Footer>
        <li>
            <a href="http://github.com/trsctr/trsctr.github.io" target="_blank" className={cn(linkStyle, 'me-4 md:me-12')}>Source code</a>
        </li>
        <li>
            <a href="http://github.com/trsctr" target="_blank" className={cn(linkStyle, 'me-4 md:me-12')}>GitHub</a>
        </li>

        <li>
            <a href="http://linkedin.com/in/otto-andelin" target="_blank" className={cn(linkStyle, 'me-4 md:me-12')}>LinkedIn</a>
        </li>
        <li >
            <a href="#" onClick={toggleModal} className={linkStyle}>Contact</a>
        </li>
        </Footer>
    </ContentBox>
    );
};

export default About;