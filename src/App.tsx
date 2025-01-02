import React from 'react';
import About from './components/About';
import Header from './components/Header';
import MeshCanvas from './components/MeshCanvas';
import BackgroundCanvas from './components/BackgroundCanvas';
import ContactFormModal from './components/modal/ContactFormModal';
import useModal from './components/modal/useModal';

const App: React.FC = () => {
  const { toggleModal } = useModal();
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
                <p className="mb-2">This is my webpage.</p>
                <p>There are many like it, but this one is mine.</p>
                <p className="mt-2">Something something something about something and I like cats and good music.</p>
                <p className="mt-2">Lorem ipsum dolor shit Valmet. Shiggity shiggity schwa. Hello world. Bla bla bla. Is this shader heavy.</p>
                <p className="mt-2">Lässyn lässyn lää läpäti lää</p>
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
