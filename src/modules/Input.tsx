import { forwardRef, type InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ placeholder, type, error, ...props }, ref) => {
    return (
      <>
        <input
          {...props}
          ref={ref}
          placeholder={placeholder}
          type={type}
          className={`border rounded-sm border-gray-400 focus:outline-none focus:border-2 hover:border-black w-full h-14 py-4 px-3.5 
            ${error ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-400'}`}
        />
        {error && <span className="text-red-500 text-xs px-1">{error}</span>}
      </>
    );
  }
);

Input.displayName = 'Input';
