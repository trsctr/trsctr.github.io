/**
 * FormState
 * 
 * This is the type for the form state.
 * Fields:
 * - `user_email` (string): The user's email address.
 * - `user_name` (string): The user's name.
 * - `subject` (string): The subject of the message.
 * - `message` (string): The message content.
*/
export type FormState = {
    user_email: string;
    user_name: string;
    subject: string;
    message: string;
};