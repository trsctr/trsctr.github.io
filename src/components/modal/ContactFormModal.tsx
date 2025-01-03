import React, { useRef, useState, useEffect } from 'react';
import Modal from './Modal';
import { PrimaryButton, SecondaryButton } from './ModalButtons';
import useModal from './useModal';
//import emailjs from '@emailjs/browser';

type FormFieldProps = {
    label: string;
    type: string;
    name: string;
    id: string;
    value: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | HTMLTextAreaElement) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, name, id, value, required = false, onChange }) => {
    return (
    <div className="relative z-0 w-full mb-5 group"> 
        {type === 'textarea' ? (
        <textarea
            name="message"
            id="floating_message"
            rows={4}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={onChange}
            value={value}
            placeholder=" "
            required = {required}
                                />
        ) : (
        <input
            type={type}
            name={name}
            id={id}
            className="peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            onChange={onChange}
            value={value}
            placeholder=" "
            required = {required}
        />)}
        <label
            htmlFor={id}
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
           {label}
        </label>
    </div>
    )
}
    
const mockSendForm = (form: HTMLFormElement) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 9000) + 1000;
        const isSuccess = Math.random() > 0.5;

        const formData = new FormData(form);
        const userEmail = formData.get('user_email') as string;
        const userName = formData.get('user_name') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        console.log('Send delay:', delay);
        console.log('Simulated message contents:', {
            userEmail,
            userName,
            subject,
            message,
        });

        setTimeout(() => {
            if (isSuccess) {
                // Simulate success
                resolve({
                    status: 200,
                    text: 'OK',
                    response: 'Message sent successfully',
                });
            }
            else {
                // Simulate failure
                reject ({
                    status: 500,
                    text: 'Bad Request',
                    response: 'Failed to send message. Please try again',
                });
            }
        }, delay);
    });
};

const ContactFormModal: React.FC = () => {
    const { toggleModal } = useModal();
    const form = useRef<HTMLFormElement>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [headerStatus, setHeaderStatus] = useState('Send me a message');
    const [bodyStatus, setBodyStatus] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false); // New state to track submission
    const [formData, setFormData] = useState({
        user_email: '',
        user_name: '',
        subject: '',
        message: '',
    });
    
    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleCancel = () => {
        setFormData({
            user_email: '',
            user_name: '',
            subject: '',
            message: '',
        });
        toggleModal();
    }
    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
    
        console.log("Current form ref: ", form.current);
    
        if (form.current) {
            setIsSubmitting(true);
            setHeaderStatus('Sending your message...');
            setBodyStatus('this will have a fancy spinner');
            // Set a timeout duration (e.g., 7 seconds)
            const TIMEOUT_DURATION = 9000; // 7 seconds
    
            // Create a timeout promise
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out")), TIMEOUT_DURATION)
            );
    
            // Use Promise.race to race between the sendForm and the timeout
            Promise.race([
                mockSendForm(
                    // import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID || '',
                    // import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID || '',
                    form.current,
                    // { publicKey: import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY || '' }
                ),
                timeoutPromise
            ])
            .then(() => {
                // Success: Show success message, reset form
                setHeaderStatus('Message sent!');
                setBodyStatus('Thank you for reaching out. I will get back to you soon.');
                setFormSubmitted(true); // Mark as submitted
                console.log('SUCCESS!');
            })
            .catch((error) => {
                // Failure: Show error message, handle timeout separately
                if (error.message === "Request timed out") {
                    setHeaderStatus('Request timed out.');
                    setBodyStatus('Are you sure you have an internet connection?');
                    console.log('ERROR: Request timed out');
                } else {
                    setHeaderStatus('Something went wrong');
                    setBodyStatus('Failed to send your message, sorry about that. Please try again.');
                    console.log('FAILED...', error.message);
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setIsSubmitting(false);
                    setHeaderStatus('Send me a message');
                }, 2000);
            });
        }
    };
        
    //useEffect to handle modal close when form is successfully submitted
    useEffect(() => {
        console.log("useEffect triggered");
        const timer = setTimeout(() => {
            if (formSubmitted) {
                console.log("Modal will close");
                toggleModal();
                setHeaderStatus('Your message has been sent');
                setBodyStatus('"One message should be enough for everyone" - probably not Bill Gates');
            }
            }, 2000); // Close modal after 2 seconds
                
        return () => clearTimeout(timer); // Cleanup on unmount or state change
    }, [formSubmitted]); // Trigger when formSubmitted changes
    

    return (
        <Modal title={headerStatus}>
            {isSubmitting ? (
                <div className="flex justify-center items-center">
                    <p>{bodyStatus}</p>
                </div>
            ) : (
                <form ref={form} autoComplete="off" onSubmit={sendEmail} className="w-full">
                    {!formSubmitted ? (
                        <>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <FormField label="Email address" type="email" name="user_email" id="floating_email" value={formData.user_email} required onChange={handleInputChange} />
                                <FormField label="Name" type="text" name="user_name" id="floating_name" value={formData.user_name} onChange={handleInputChange} />
                            </div>
                            <FormField label="Subject" type="text" name="subject" id="floating_subject" value={formData.subject} onChange={handleInputChange} />
                            <FormField label="Message" type="textarea" name="message" id="floating_message" value={formData.message} required onChange={handleInputChange} />
                            <div className="flex space-x-3">
                                <PrimaryButton type="submit" label="Send" />
                                <SecondaryButton type="reset" onClick={handleCancel} label="Cancel" />
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center">
                            <p>{bodyStatus}</p>
                        </div>
                    )}
                </form>
            )}
        </Modal>
    );
};

export default ContactFormModal;
