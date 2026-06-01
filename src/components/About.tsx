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
            <p className="mb-2">I'm a creative software developer with a background in music and audio engineering. I love experimenting, creative coding and building things that get put good use.</p>
            <p>I studied coding at <a href="http://hive.fi" className={linkStyle} target="_blank">Hive Helsinki</a> (so I'm <a href="https://42network.org" className={linkStyle} target="_blank">42 network</a> alumni). I gained hands-on experience in programming with C and C++ by building various projects with strict limitations on which external libraries could be used (usually none).</p>
            <p className="mt-2">Currently I'm building <a href="https://github.com/trsctr/viive" className={linkStyle} target="_blank">viive</a>, a creative delay plugin built with JUCE and C++. VST3 available for Windows and macOS, check out latest releases <a href="https://github.com/trsctr/viive/releases" className={linkStyle} target="_blank">here</a>.</p>
            <p className="mt-4">Photo by <a href="https://www.instagram.com/diego_j_videos_and_photography/" className={linkStyle} target="_blank">Diego James</a>.</p>
        </TextImageBox>
        <Footer>
        <li>
            <a href="https://github.com/trsctr/trsctr.github.io" target="_blank" className={cn(linkStyle, 'me-2 md:me-12')}>Source</a>
        </li>
        <li>
            <a href="https://github.com/trsctr" target="_blank" className={cn(linkStyle, 'me-2 md:me-12')}>GitHub</a>
        </li>
        <li>
            <a href="https://www.linkedin.com/in/otto-andelin/" target="_blank" className={cn(linkStyle, 'me-2 md:me-12')}>LinkedIn</a>
        </li>
        <li>
            <a href="https://youtube.com/@trsctr" target="_blank" className={cn(linkStyle, 'me-2 md:me-12')}>YouTube</a>
        </li>
        <li >
            <a href="#" onClick={toggleModal} className={linkStyle}>Contact</a>
        </li>
        </Footer>
    </ContentBox>
    );
};

export default About;