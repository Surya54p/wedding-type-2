import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 font-medium uppercase tracking-widest cursor-pointer";
  
  const variants = {
    primary: "bg-wedding-gold text-wedding-dark hover:bg-wedding-tan border border-wedding-gold",
    outline: "bg-transparent text-wedding-gold border border-wedding-gold hover:bg-wedding-gold hover:text-wedding-dark",
    ghost: "bg-transparent text-wedding-gold hover:text-wedding-tan",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-12 py-4 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
