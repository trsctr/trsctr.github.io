import React from 'react';
import useModal from './modal/useModal';
/*
    * A component that displays the footer of the page.
*/

const Footer: React.FC = () => {
    const { toggleModal } = useModal();

    return (
    <footer className="bg-transparent">
    <div className="mx-auto w-full pt-2 md:pt-5 md:flex md:items-center md:justify-between">
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-primary sm:mt-0">
        <li>
            <a href="http://github.com/trsctr/trsctr.github.io" className="hover:underline hover:text-accent me-4 md:me-12">Source code</a>
        </li>
        <li>
            <a href="http://github.com/trsctr" className="hover:underline hover:text-accent me-4 md:me-12">GitHub</a>
        </li>

        <li>
            <a href="#" className="hover:underline hover:text-accent me-4 md:me-12">LinkedIn</a>
        </li>
        <li>
            <a href="#" onClick={toggleModal} className="hover:underline hover:text-accent">Contact</a>
        </li>
    </ul>
    </div>
</footer>);
}

export default Footer;