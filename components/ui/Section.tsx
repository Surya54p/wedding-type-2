import React from "react";

interface SectionProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
    children,
    id,
    className = "",
    containerClassName = "",
}) => {
    return (
        <section
            id={id}
            className={`relative py-20 px-4 md:py-32 ${className}`}
        >
            <div className={`max-w-6xl mx-auto ${containerClassName}`}>
                {children}
            </div>
        </section>
    );
};
