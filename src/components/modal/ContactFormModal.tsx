import React, { useRef, useState } from 'react';
import Modal from './Modal';
import { PrimaryButton, SecondaryButton } from './ModalButtons';
import useModal from './useModal';
import emailjs from '@emailjs/browser';

const ContactFormModal: React.FC = () => {
    const { toggleModal } = useModal();
    const form = useRef<HTMLFormElement>(null);

    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Send me a message');
    const [formSubmitted, setFormSubmitted] = useState(false); // New state to track submission

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (form.current) {
            setLoading(true);
            setStatusMessage('Sending your message...');

            emailjs
                .sendForm(
                    import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID || '',
                    import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID || '',
                    form.current,
                    { publicKey: import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY || '' }
                )
                .then(
                    () => {
                        // Success: Show success message, reset form, and close modal
                        setStatusMessage('Message sent successfully!');
                        setFormSubmitted(true); // Mark as submitted
                        setTimeout(() => {
                            if (form.current) form.current.reset();
                            toggleModal(); // Close the modal after delay
                            setStatusMessage('Send me a message'); // Reset status message
                        }, 2000); // Adjust the delay as needed
                    },
                    (error) => {
                        // Failure: Show error message
                        setStatusMessage('Failed to send message. Please try again.');
                        console.log('FAILED...', error.text);
                    }
                )
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <Modal title={formSubmitted ? 'Confirmation' : statusMessage}>
            {loading ? (
                <div className="flex justify-center items-center">
                    <p>{statusMessage}</p>
                </div>
            ) : (
                <form ref={form} autoComplete="off" onSubmit={sendEmail} className="w-full">
                    {!formSubmitted ? (
                        <>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="email"
                                        name="user_email"
                                        id="floating_email"
                                        className="peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_email"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Email address
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="user_name"
                                        id="floating_name"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Name
                                    </label>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="subject"
                                    id="floating_subject"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_subject"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Subject
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <textarea
                                    name="message"
                                    id="floating_message"
                                    rows={4}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_message"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Your message
                                </label>
                            </div>

                            <div className="flex space-x-3">
                                <PrimaryButton type="submit" label="Send" />
                                <SecondaryButton type="button" onClick={toggleModal} label="Cancel" />
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center">
                            <p>{statusMessage}</p>
                        </div>
                    )}
                </form>
            )}
        </Modal>
    );
};

export default ContactFormModal;
