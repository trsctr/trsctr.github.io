import React from 'react';
import About from './components/About';
import Header from './components/common/Header';
import MeshCanvas from './components/canvas/MeshCanvas';
import BackgroundCanvas from './components/canvas/BackgroundCanvas';
import ContactFormModal from './components/contact-form/ContactFormModal';

/**
 * App Component
 * 
 * The main component that renders the entire application/site.
 * 
 */
const App: React.FC = () => {
	return (
		<div className="w-full h-full bg-gradient-to-b from-background-top to-black">
		{/* Main container with flex layout */}
		
		{ /* Add animation:
			- Loading animation displayed while still loading
			- Fade-in animation for the entire page
		*/}

		{/* Background canvas */}
		<div className=" top-0 left-0 w-full h-full fixed">
			<BackgroundCanvas />
		</div>

		<div className="min-h-screen flex flex-col lg:flex-row items-center justify-center w-full">

			{/* Page url at top left of the page (visible on medium screens and up) */}
			<div className="absolute top-0 left-0 p-5 hidden md:block">
				<Header text="trsctr.github.io" textSize="text-2xl" hasGradient className="tracking-widest font-mono z-20" />
			</div> 


			<div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full h-full relative">
				
				{/* Textbox section */}
				<div className="flex-1 p-5 z-30">
				<About/>
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
