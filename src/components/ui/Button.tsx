import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-transform transform focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-pink-400';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white hover:from-pink-600 hover:via-purple-700 hover:to-indigo-800 focus:ring-pink-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-yellow-400 via-pink-400 to-red-400 text-white hover:from-yellow-500 hover:via-pink-500 hover:to-red-500 focus:ring-yellow-400 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-pink-500 text-pink-600 hover:bg-pink-50 focus:ring-pink-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
  };
  
  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-5 text-base',
    lg: 'py-3 px-7 text-lg',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyles}
        ${disabledStyles}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={e => e.currentTarget.classList.add('scale-105')}
      onMouseLeave={e => e.currentTarget.classList.remove('scale-105')}
    >
      {children}
    </button>
  );
};

export default Button;