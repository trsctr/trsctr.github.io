import React, { useRef, useState, useEffect } from 'react';
import Modal from '../modal/Modal';
import { PrimaryButton, SecondaryButton } from './FormButtons';
import useModal from '../modal/useModal';
import { FormState } from '../../types/formTypes';
import { handleInputChange, handleCancel, sendEmailRequest, resetForm} from '../../utils/formUtils';
import FormField from '../common/FormField';
import Spinner from '../common/Spinner';

/**
 * StatusMessage Component
 * 
 * A component that displays feedback messages based on the current form submission status.
 * 
 * Features:
 * - Renders a spinner when the form submission is in progress (`status: "sending"`).
 * - Shows error messages for failed submissions (`status: "error"` or `"timeout"`).
 * - Displays a success message when the form is successfully submitted (`status: "success"`).
 * 
 * Props:
 * - `status` ('sending' | 'error' | 'timeout' | 'success'): The current status of the form submission.
 */
const StatusMessage: React.FC<{ status: 'sending' | 'error' | 'timeout' | 'success' }> = ({ status }) => {
    const paragraphStyle = "py-2 text-md font-medium text-text"; // Common paragraph style

    const content: Record<'sending' | 'error' | 'timeout' | 'success', JSX.Element> = {
        sending: <div className="grid place-items-center py-2 align-middle"><Spinner /></div>,
        error: <p className={paragraphStyle}>Failed to send your message, please try again.</p>,
        timeout: <p className={paragraphStyle}>Please check your connection status and try again.</p>,
        success: <p className={paragraphStyle}>Thank you for reaching out. I will get back to you soon.</p>,
    };

    return (
        <div className="grid place-items-center text-center justify-center items-center align-middle">
            {content[status]}
        </div>
    );
};

/**
 * ContactFormModal Component
 * 
 * A modal that allows the user to submit a contact form and displays feedback based on the form submission status.
 * 
 * Features:
 * - Displays a contact form with fields for email, name, subject, and message.
 * - Tracks and manages the status of form submission (`sending`, `success`, `error`, `timeout`, `idle`).
 * - Resets the form and closes the modal after a successful submission.
 * - Prevents the user from submitting the form again after a successful submission.
 * - Dynamically renders the form or a status message depending on the submission status.
 * 
 * States:
 * - `status` (`'sending' | 'success' | 'error' | 'timeout' | 'idle'`): Tracks the current status of the form submission.
 * - `formSubmitted` (boolean): Indicates whether the form has been successfully submitted. If `true`, the form will not be rendered again.
 * - `formData` (`FormState`): Stores the current form data, including the fields for email, name, subject, and message.
 * 
 * Props: None
 */

const ContactFormModal: React.FC = () => {
    const { toggleModal } = useModal(); // Get the modal toggler from context
    
    const form = useRef<HTMLFormElement>(null); // Ref for the form element
    
    const [status, setStatus] = useState<
        'sending' | 
        'success' | 
        'error' | 
        'timeout' | 
        'idle'>
        ('idle'); // set idle as default status

    // if form is submitted, set to true to prevent further submissions
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Form data state
    const [formData, setFormData] = useState<FormState>({
        user_email: '',
        user_name: '',
        subject: '',
        message: '',
    });
    
    // Function to handle form submission
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent) => {
        e.preventDefault();
        // Call sendEmailRequest function to handle form submission
        sendEmailRequest(form.current, setStatus, setFormSubmitted); // found in formUtils.ts
    };

    //useEffect to handle modal close when form is successfully submitted
    useEffect(() => {
        if (!formSubmitted && status !== 'success')
            return; // Do nothing if form is not submitted or status is not success
        const timer = setTimeout(() => {
            resetForm(setFormData, form.current);
            setStatus('idle');
            toggleModal(); // close the modal after 2 seconds
        }, 2000)
        
        return () => clearTimeout(timer)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formSubmitted]); // Trigger when formSubmitted changes
    
    // Mapping of modal titles based on status
    const modalTitleMapping: Record<'sending' | 'error' | 'timeout' | 'success' | 'idle', string> = {
        sending: 'Sending your message...',
        error: 'Something went wrong',
        timeout: 'Request timed out',
        success: 'Message sent!',
        idle: 'Send me a message',
    };

    return (
        <Modal title={formSubmitted ? 'Thanks for getting in touch!' : modalTitleMapping[status]}>
            {status !== 'idle' ? (
                <StatusMessage status={status}/>
            ) : (
                <div className="flex justify-center items-center">
                    {!formSubmitted ? (
                        <form ref={form} autoComplete="off" onSubmit={handleSubmit} className="w-full">
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <FormField 
                                    label="Email address*"
                                    type="email"
                                    name="user_email" 
                                    id="floating_email"
                                    value={formData.user_email}
                                    required
                                    onChange={
                                        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                        handleInputChange(e, setFormData)
                                    }
                                />
                                <FormField
                                    label="Name"
                                    type="text"
                                    name="user_name" 
                                    id="floating_name"
                                    value={formData.user_name} 
                                    onChange={
                                        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                        handleInputChange(e, setFormData)
                                    }  
                                />
                            </div>
                            <FormField 
                                label="Subject" 
                                type="text" 
                                name="subject"
                                id="floating_subject" 
                                value={formData.subject} 
                                onChange={
                                    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleInputChange(e, setFormData)
                                }
                            />
                            <FormField 
                                label="Message* (max 640 characters)"
                                type="textarea" 
                                name="message" 
                                id="floating_message"
                                maxChars={640} 
                                value={formData.message} 
                                required
                                onChange={
                                    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleInputChange(e, setFormData)
                                }
                            />
                            <p className="pt-0 pb-4 text-xs text-gray-400">*Required fields</p>
                            <div className="hidden aria-hidden">
                                <FormField
                                    label="Leave this field empty"
                                    id="honeypot_field"
                                    onChange={()=>{}}
                                    value=""
                                    type="text"
                                    name="honeypot"
                                />
                            </div>
                            <div className="flex space-x-3">
                                <PrimaryButton 
                                    type="submit"
                                    label="Send"
                                />
                                <SecondaryButton 
                                    type="reset"
                                    onClick={() => handleCancel(setFormData, toggleModal, form.current)}
                                    label="Cancel"
                                />
                            </div>
                        </form>
                    ) : (
                        <div className="justify-center items-center text-center align-center">
                            <p className="pt-2 italic text-md font-medium">
                                'One message should be enough for everyone'
                            </p>
                            <p className="py-2 text-text text-sm">
                                - probably not Bill Gates
                            </p>
                            <p className="py-2">
                                <SecondaryButton
                                    type="button"
                                    onClick={toggleModal}
                                    label="Okay"
                                    className="mx-auto"
                                />
                            </p>
                        </div>
                    )}
                </div>
            )}
        </Modal>
    );
};

export default ContactFormModal;