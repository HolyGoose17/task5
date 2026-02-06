import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'active';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: ReactNode;
}

const baseStyles =
  'inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium';

const variants = {
  primary: 'bg-green-400 text-black hover:bg-blue-hover rounded-sm shadow-sm',

  secondary: 'bg-secondary text-black hover:opacity-90 shadow-btn rounded-sm',

  outline: 'border border-black text-black hover:bg-blue-hover rounded-sm',

  ghost: 'text-blue-400 hover:bg-gray-100 rounded-md',

  active: 'bg-blue-400 text-black rounded-md shadow-sm',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-8 py-2 text-md',
  icon: 'h-8 w-8',
};
export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
