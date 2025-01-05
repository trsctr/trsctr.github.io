import React, { useRef, useState, useEffect } from 'react';
import Modal from '../Modal';
import { PrimaryButton, SecondaryButton } from '../ModalButtons';
import useModal from '../useModal';
import { FormState } from './formTypes';
import { handleInputChange, handleCancel, sendEmailRequest, resetForm} from './formUtils';
import FormField from './FormField';
import Spinner from '../../Spinner';


const ContactFormModal: React.FC = () => {
    const { toggleModal } = useModal();
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'sending' | 'success' | 'error' | 'timeout' | 'idle'>('idle');
    const [formSubmitted, setFormSubmitted] = useState(false); // New state to track submission
    const [formData, setFormData] = useState<FormState>({
        user_email: '',
        user_name: '',
        subject: '',
        message: '',
    });
    
    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmailRequest(form.current, setStatus, setFormSubmitted);
    };

    //useEffect to handle modal close when form is successfully submitted
    useEffect(() => {
        if (formSubmitted && status === 'success') {
            const timer = setTimeout(() => {
                resetForm(setFormData, form.current);
                setStatus('idle');
                toggleModal();
            }, 2000)
            return () => clearTimeout(timer)
        };
         // Close modal after 2 seconds
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formSubmitted]); // Trigger when formSubmitted changes
    
    const statusTitleMapping: Record<'sending' | 'error' | 'timeout' | 'success' | 'idle', string> = {
        sending: 'Sending your message...',
        error: 'Something went wrong',
        timeout: 'Request timed out',
        success: 'Message sent!',
        idle: 'Send me a message',
    };
    

    return (
        <Modal title={formSubmitted ? 'Thanks for getting in touch!' : statusTitleMapping[status]}>
            {status === 'sending' ? (
                <div className="grid place-items-center text-center justify-center items-center align-middle">
                    <div className="grid place-items-center py-2 align-middle">
                    <Spinner/>
                    </div>
                </div>
            ) : status === 'error' ? (
                <div className="grid place-items-center text-center justify-center items-center align-middle">
                    <p className="py-2 text-md font-medium text-text">Failed to send your message, please try again.</p>
                </div>
            ) : status === 'timeout' ? (
                <div className="grid place-items-center text-center justify-center items-center align-middle">
                    <p className="py-2 text-md font-medium text-text">Please check your connection status and try again.</p>
                </div>
            ) : status === 'success' ? (
                <div className="grid place-items-center text-center justify-center items-center align-middle">
                    <p className="py-2 text-md font-medium text-text">Thank you for reaching out. I will get back to you soon.</p>
                </div>
            ) : (
            <div className="flex justify-center items-center">

            {!formSubmitted ? (
                <form ref={form} autoComplete="off" onSubmit={sendEmail} className="w-full">
                    <div className="grid md:grid-cols-2 md:gap-6">
                    <FormField label="Email address*" type="email" name="user_email" id="floating_email" value={formData.user_email} required onChange={(e) => handleInputChange(e, setFormData)} />
                    <FormField label="Name" type="text" name="user_name" id="floating_name" value={formData.user_name} onChange={(e) => handleInputChange(e, setFormData)} />
                    </div>
                    <FormField label="Subject" type="text" name="subject" id="floating_subject" value={formData.subject} onChange={(e) => handleInputChange(e, setFormData)} />
                    <FormField label="Message* (max 256 characters)" type="textarea" name="message" id="floating_message" maxChars = {(256)} value={formData.message} required onChange={(e) => handleInputChange(e, setFormData)} />
                    <p className="pt-0 pb-4 text-xs text-gray-400">*Required fields</p>
                    <div className="flex space-x-3">
                    <PrimaryButton type="submit" label="Send" />
                    <SecondaryButton type="reset" onClick={() => handleCancel(setFormData, toggleModal, form.current)} label="Cancel" />
                    </div>
                
                </form>
                    ) : (
                    <div className="justify-center items-center text-center align-center">
                    <p className="pt-2 italic text-md font-medium">'One message should be enough for everyone'</p>
                    <p className="py-2 text-text text-sm">- probably not Bill Gates</p>
                    <p className="py-2"><SecondaryButton type="button" onClick={toggleModal} label="Okay" className="mx-auto"/></p>
                    </div>
                )}
            </div>
        )}
        </Modal>
    );
};


export default ContactFormModal;
