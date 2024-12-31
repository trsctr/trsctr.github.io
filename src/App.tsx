import React from 'react';
import About from './components/About';
import Header from './components/Header';
import Modal from './components/Modal';
const App: React.FC = () => {
  return (

    <div className="bg-black min-h-screen mt-0 flex items-center justify-center w-full h-full">

       <div className="absolute top-0 left-0 p-5 hidden md:block">
        <Header text="trsctr.github.io" textSize="text-2xl" className="tracking-widest font-mono" hasGradient/>
       </div>
       <About title="Hello, my name is Otto" imageUrl="/assets/photo.jpg" imageOnRight>
       <p className="mb-2">
         This is my webpage.
       </p>
       <p>
         There are many like it, but this one is mine.
       </p>
       <p className="mt-2">
         Something something something about something and I like cats and good music.</p>
       <p className="mt-2">I'm beginning to like Tailwind. It's useful and makes CSS less nervewracking than it could be.</p>
      
       <p className="mt-2">Which is nice.</p>
       </About> 
       <Modal/>
  </div>

  );
};

export default App;
