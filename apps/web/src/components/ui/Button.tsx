import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = 'bg-primary text-on-primary hover:bg-surface-tint border border-transparent';
      break;
    case 'outline':
      variantClasses = 'text-primary border border-outline hover:bg-surface-container bg-transparent';
      break;
    case 'ghost':
      variantClasses = 'text-primary hover:bg-surface-container bg-transparent border border-transparent';
      break;
  }

  return (
    <button
      className={`flex items-center justify-center font-body-md text-body-md px-4 py-2 rounded-DEFAULT transition-colors ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
