import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = ({ name, placeholder, type, error, ...props }: InputProps) => {
  return (
    <>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        {...props}
        className={
          'border rounded-sm border-gray-400 focus:outline-none focus:border-2 hover:border-black w-full h-14 py-4 px-3.5 focus:border-blue-400'
        }
      />
      <span className="text-red-500 text-xs px-1">{error}</span>
    </>
  );
};

Input.displayName = 'Input';
