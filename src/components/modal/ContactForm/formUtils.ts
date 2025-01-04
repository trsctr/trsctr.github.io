import React from 'react';
import { FormState } from './formTypes';

export const mockSendForm = (form: HTMLFormElement) => {
    return new Promise((resolve, reject) => {
        const delay = 8000;//Math.floor(Math.random() * 9000) + 1000;
        const isSuccess = true;//Math.random() > 0.5;

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
 
export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFormData: React.Dispatch<React.SetStateAction<FormState>>
) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
};

export const resetForm = (setFormData: React.Dispatch<React.SetStateAction<FormState>>, form: HTMLFormElement | null) => {
    console.log("resetForm called");
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

    setStatus('sending');
    
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), setTimeoutDuration)
    );

    try {
        await Promise.race([
            mockSendForm(
                // import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID || '',
                // import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID || '',
                form,
                // { publicKey: import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY || '' }
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
    }
};
