import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    options: string[];
};

export function Select({ label, options, ...props }: SelectProps) {
    return (
        <div className="group flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-widest text-primary-blue opacity-70 group-focus-within:opacity-100 transition-opacity duration-200">
                {label}
            </label>
            <select
                {...props}
                className={`w-full bg-transparent border-b-2 border-blue-200 px-0 py-2 text-sm text-primary-blue focus:outline-none focus:border-primary-blue transition-all duration-300 cursor-pointer appearance-none ${props.className || ""}`}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
