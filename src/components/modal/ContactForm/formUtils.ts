import React from 'react';
import { FormState } from './formTypes';
import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';

export const sanitizeFormData = (formData: FormData): FormData => {
    const sanitizedData = new FormData();
    for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') {
            // Sanitize and strip all HTML tags
            sanitizedData.append(key, DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }));
        }
    }
    return sanitizedData;
};

export const mockSendForm = (form: HTMLFormElement) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 9000) + 1000;
        const isSuccess = false;//Math.random() > 0.5;

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

const validateEmail = (email: string) => {
    const re = /.+@.+\..+/;
    return re.test(email);
}

export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFormData: React.Dispatch<React.SetStateAction<FormState>>
) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
};

export const resetForm = (setFormData: React.Dispatch<React.SetStateAction<FormState>>, form: HTMLFormElement | null) => {
    setFormData({
        user_email: '',
        user_name: '',
        subject: '',
        message: '',
    });
    if (form) form.reset();
}
export const handleCancel = (
    setFormData: React.Dispatch<React.SetStateAction<FormState>>,
    toggleModal: () => void,
    form: HTMLFormElement | null
) => {
    resetForm(setFormData, form);
    toggleModal();
};

export const sendEmailRequest = async (
    form: HTMLFormElement | null,
    setStatus: React.Dispatch<React.SetStateAction<'sending' | 'error' | 'timeout' | 'success' | 'idle'>>,
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
    setTimeoutDuration: number = 9000
) => {
    if (!form) return;

    const honeypotField = form.honeypot?.value as string;
    
    if (honeypotField) {
        // If the honeypot field is filled, it's likely a bot
        return; // Stop the form submission
    }

    const formData = new FormData(form);
    const sanitizedData = sanitizeFormData(formData);

    if (!validateEmail(sanitizedData.get('user_email') as string)) {
        alert("Invalid email address!");
        return;
    }
    const sanitizedMessage = sanitizedData.get('message') as string;

    if (!sanitizedMessage || sanitizedMessage.length < 10) {
        alert("Your message should contain at least 10 characters!")
        return;
    }

   
    // Create a new form element
    const sanitizedForm = document.createElement('form');
    sanitizedForm.style.display = 'none'; // Hide the form to avoid visual interference

    // Populate the new form with sanitized data
    for (const [key, value] of sanitizedData.entries()) {
        const input = document.createElement('input');
        input.type = 'hidden'; // Use hidden inputs to avoid rendering them
        input.name = key;
        input.value = value as string;
        sanitizedForm.appendChild(input);
    }

    // Append the new form to the document body temporarily
    document.body.appendChild(sanitizedForm);

     setStatus('sending');

    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), setTimeoutDuration)
    );

    try {
        await Promise.race([
            emailjs.sendForm(
                import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID || '',
                import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID || '',
                sanitizedForm, // Use the new sanitized form
                { publicKey: import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY || '' }
            ),
            timeoutPromise
        ]);
        setStatus('success');
        setFormSubmitted(true);
    } catch (error: any) {
        if (error.message === "Request timed out") {
            setStatus('timeout');
        } else {
            setStatus('error');
        }
        setTimeout(() => setStatus('idle'), 3000);
    } finally {
        document.body.removeChild(sanitizedForm); // Clean up the form after sending
    }
};
