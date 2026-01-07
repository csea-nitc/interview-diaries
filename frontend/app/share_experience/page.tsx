"use client";

import { useState } from "react";

type Section = {
    heading: string;
    body: string;
};

export default function ShareExperiencePage() {
    const [sections, setSections] = useState<Section[]>([
        { heading: "", body: "" },
        { heading: "", body: "" },
    ]);

    const addSection = () => {
        setSections([...sections, { heading: "", body: "" }]);
    };

    return (
        <main className="min-h-screen bg-[#f7f4f2] flex">


            {/* Content */}
            <section className="flex-1 px-4 sm:px-6 md:px-12 py-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-3xl font-semibold text-blue-700 mx-auto">
                        Share your experience
                    </h1>
                    <p className="font-[var(--font-epilogue)] mt-2 text-sm text-gray-600 mx-auto">
                        Contribute to popular belief. Share your interview experience to
                        help others prepare better.
                    </p>
                </div>

                {/* Form */}
                <form className="mt-10 max-w-3xl space-y-6 mx-auto">
                    <Input label="Name" placeholder="Ex: John Doe" />
                    <Input label="Company" />
                    <Select
                        label="Type"
                        options={["Full Time", "Internship"]}
                    />
                    <Input label="Role" placeholder="Ex: Systems Architect" />
                    <Input label="Year" placeholder="Ex: 2025" />
                    <Input
                        label="Stipend"
                        placeholder="Ex: CTC - 34 LPA, Base - 17,70,000"
                    />
                    <Input label="Number of Rounds" placeholder="Ex: 4" />

                    <Textarea
                        label="Rounds Overview"
                        placeholder={`Ex:
Number of rounds - 4
Number of Test Round - 1
Number of Interview Rounds - 3`}
                    />

                    {/* Dynamic Sections */}
                    {sections.map((section, idx) => (
                        <div key={idx} className="pt-6 border-t">
                            <h2 className="text-lg font-semibold text-blue-700">
                                Round {idx + 1}
                            </h2>

                            <Input
                                label="Round Name"
                                placeholder="Ex: Round 1 (Online Test)"
                                value={section.heading}
                                onChange={(e) => {
                                    const copy = [...sections];
                                    copy[idx].heading = e.target.value;
                                    setSections(copy);
                                }}
                            />

                            <Textarea
                                label="Descriptions"
                                placeholder={`Ex:
1 coding question
3 technical MCQs
15 aptitude MCQs`}
                                value={section.body}
                                onChange={(e) => {
                                    const copy = [...sections];
                                    copy[idx].body = e.target.value;
                                    setSections(copy);
                                }}
                            />
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSection}
                        className="text-blue-600 text-sm font-medium flex border-2 rounded-full border-dashed py-1 px-2 mx-auto items-center gap-1"
                    >
                        <span className="text-3xl">+</span> Add section
                    </button>

                    <div className="pt-6 text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-1 text-lg rounded-full hover:bg-blue-700 transition text-right"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

/* ---------- Reusable Components ---------- */

type InputProps = {
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function Input({ label, ...props }: InputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
                {label}
            </label>
            <input
                {...props}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

type TextareaProps = {
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

function Textarea({ label, ...props }: TextareaProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
                {label}
            </label>
            <textarea
                rows={4}
                {...props}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

type SelectProps = {
    label: string;
    options: string[];
};

function Select({ label, options }: SelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
                {label}
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {options.map((opt) => (
                    <option key={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}
