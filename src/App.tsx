import React from 'react';
import About from './components/About';
import Header from './components/Header';
import MeshCanvas from './components/MeshCanvas';
import BackgroundCanvas from './components/BackgroundCanvas';
import ContactFormModal from './components/modal/ContactForm/ContactFormModal';

const App: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-background-top to-black">
      {/* Main container with flex layout */}
      <div className=" top-0 left-0 w-full h-full fixed">
        <BackgroundCanvas />
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center w-full">

        {/* Header section (visible on medium screens and up) */}
        <div className="absolute top-0 left-0 p-5 hidden md:block">
          <Header text="trsctr.github.io" textSize="text-2xl" className="tracking-widest font-mono z-20" hasGradient />
        </div> 


          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full h-full relative">
            
            {/* Textbox section */}
            <div className="flex-1 p-5 z-30">
            <About title="Hello, my name is Otto" imageUrl="/assets/photo.jpg" imageOnRight>
              <p className="mb-2">I'm a software engineer with a background in audio engineering and tech support, passionate about creative coding.</p>
              <p>I recently completed my core studies at <a href="http://hive.fi" className="text-primary hover:text-accent transition-all" target="_blank">Hive Helsinki</a>, where I gained hands-on experience in programming with C and C++. </p>
              <p className="mt-2">I built this page so I could have some fun with React, Tailwind, and Three.js, and showcase my projects in the future.</p>
              <p className="mt-2">Hope you like what you see! Feel free to interact with that mesh, check out my work and connect with me on LinkedIn or GitHub.</p>
              <p className="mt-2">The photo on the right was taken by fellow Hive student <a href="https://www.instagram.com/diego_j_videos_and_photography/" className="text-primary hover:text-accent transition-all" target="_blank">Diego James</a>.</p>
            </About>
            <ContactFormModal/>
            </div>

            {/* 3D Mesh section */}
            <div className="flex-1 p-5 flex justify-center -mt-20 lg:mt-0 z-0">
              <div className="relative min-w-[200px] w-full max-w-[800px] h-auto aspect-[1/1]">
                <MeshCanvas />
              </div>
            </div>
          </div>
        </div>

      </div>
  );
};

export default App;
