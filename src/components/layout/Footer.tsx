import React from 'react';

interface FooterProps {
    children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ( { children }) => {

    return (
        <footer className="bg-transparent"> 
            <div className="mx-auto w-full pt-2 md:pt-5 lg:pt-2 md:flex md:items-center md:justify-between">
                <ul className=" flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
                    {children}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;