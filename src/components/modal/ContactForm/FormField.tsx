import React from 'react';

type FormFieldProps = {
    label: string;
    type: string;
    name: string;
    id: string;
    value: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, name, id, value, required = false, onChange }) => {
    return (
    <div className="relative z-0 w-full mb-5 group"> 
        {type === 'textarea' ? (
        <textarea
            name="message"
            id="floating_message"
            rows={4}
            className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-accent focus:outline-none focus:ring-0 peer"
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
            className="peer block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-accent focus:outline-none focus:ring-0"
            onChange={onChange}
            value={value}
            placeholder=" "
            required = {required}
        />)}
        <label
            htmlFor={id}
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
           {label}
        </label>
    </div>
    )
}

export default FormField;