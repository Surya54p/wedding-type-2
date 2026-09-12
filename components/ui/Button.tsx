import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "emerald" | "navbar";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 font-medium uppercase tracking-normal cursor-pointer";
  
  const variants = {
    primary: "bg-wedding-gold text-wedding-dark hover:bg-wedding-tan border border-wedding-gold",
    outline: "bg-transparent text-wedding-gold border border-wedding-gold hover:bg-wedding-gold hover:text-wedding-dark",
    ghost: "bg-transparent text-wedding-gold hover:text-wedding-tan",
    emerald: "bg-wedding-dark/95 backdrop-blur-md text-wedding-light border border-wedding-gold/60 hover:border-wedding-gold hover:text-wedding-gold shadow-lg shadow-black/40",
    navbar: "bg-wedding-dark/95 backdrop-blur-md text-wedding-light border border-wedding-gold/60 hover:border-wedding-gold hover:text-wedding-gold shadow-lg shadow-black/40",
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
