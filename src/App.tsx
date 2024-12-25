import React from 'react';
import About from './components/About';
import Header from './components/Header';
import Scene from './components/Scene';

const App: React.FC = () => {
  return (
    <div className="w-full h-full">
      {/* Main container with flex layout */}
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center w-full">

        {/* Header section (visible on medium screens and up) */}
        <div className="absolute top-0 left-0 p-5 hidden md:block">
          <Header text="trsctr.github.io" textSize="text-2xl" className="tracking-widest font-mono z-20" hasGradient />
        </div> 

          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full h-full relative">
            
            {/* Textbox section */}
            <div className="flex-1 p-5 z-30">
              <About title="Hello, my name is Otto" imageUrl="src/assets/meika.jpg" imageOnRight>
                <p className="mb-2">This is my webpage.</p>
                <p>There are many like it, but this one is mine.</p>
                <p className="mt-2">Something something something about something and I like cats and good music.</p>
                <p className="mt-2">I'm beginning to like Tailwind. It's useful and makes CSS less nervewracking than it could be.</p>
                <p className="mt-2">Which is nice.</p>
              </About>
            </div>

            {/* Canvas section */}
            <div className="flex-1 p-5 flex justify-center -mt-20 lg:mt-0 z-0">
              <div className="relative min-w-[200px] w-full max-w-[800px] h-auto aspect-[1/1] border-2 border-red-500">
                <Scene />
              </div>
            </div>
          </div>
        </div>

      </div>
  );
};

export default App;
