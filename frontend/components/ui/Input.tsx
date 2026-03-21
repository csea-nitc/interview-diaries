import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

export function Input({ label, ...props }: InputProps) {
    return (
        <div className="group flex flex-col gap-1">
            <label className="text-sm font-semibold uppercase tracking-widest text-primary-blue opacity-70 group-focus-within:opacity-100 transition-opacity duration-200">
                {label}
            </label>
            <input
                {...props}
                className={`w-full bg-transparent border-b-2 border-blue-200 px-0 py-2 text-sm text-primary-blue placeholder:text-secondary-blue/40 focus:outline-none focus:border-primary-blue transition-all duration-300 ${props.className || ""}`}
            />
        </div>
    );
}
