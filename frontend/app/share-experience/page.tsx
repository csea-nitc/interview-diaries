"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";

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
        <div className="w-full flex-1 flex flex-col items-center pt-16 px-8 md:px-16 lg:px-24 font-mono">
            <div className="max-w-5xl w-full flex flex-col mb-16">

                {/* Header — mirrors home page h1 style */}
                <h1 className="text-4xl font-bold font-mono text-primary-blue mb-4 tracking-wide">
                    Share your experience
                </h1>
                <p className="text-base leading-relaxed text-secondary-blue mb-12 max-w-2xl">
                    Contribute to popular belief. Share your interview experience to help
                    others prepare better.
                </p>

                {/* Divider */}
                <div className="border-t border-blue-100 mb-12" />

                {/* Form */}
                <form className="space-y-10">

                    {/* Two-column grid for short fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                        <Input label="Name" placeholder="Ex: John Doe" />
                        <Input label="Company" placeholder="Ex: Google" />
                        <Select
                            label="Type"
                            options={["Full Time", "Internship"]}
                        />
                        <Input label="Role" placeholder="Ex: Systems Architect" />
                        <Input label="Year" placeholder="Ex: 2025" />
                        <Input
                            label="Stipend / CTC"
                            placeholder="Ex: 34 LPA / ₹1,70,000 per month"
                        />
                        <Input label="Number of Rounds" placeholder="Ex: 4" />
                    </div>

                    {/* Full-width textarea */}
                    <Textarea
                        label="Rounds Overview"
                        placeholder={`Ex:\nNumber of rounds - 4\nNumber of Test Rounds - 1\nNumber of Interview Rounds - 3`}
                    />

                    {/* Dynamic Round Sections */}
                    {sections.map((section, idx) => (
                        <div key={idx} className="pt-8 border-t border-blue-100">
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-blue mb-6">
                                Round {idx + 1}
                            </h2>
                            <div className="space-y-10">
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
                                    label="Description"
                                    placeholder={`Ex:\n1 coding question\n3 technical MCQs\n15 aptitude MCQs`}
                                    value={section.body}
                                    onChange={(e) => {
                                        const copy = [...sections];
                                        copy[idx].body = e.target.value;
                                        setSections(copy);
                                    }}
                                />
                            </div>
                        </div>
                    ))}

                    {/* Add section button */}
                    <button
                        type="button"
                        onClick={addSection}
                        className="flex items-center gap-2 text-sm font-medium text-primary-blue border-b-2 border-dashed border-primary-blue/30 pb-0.5 hover:border-primary-blue transition-all duration-200"
                    >
                        <span className="text-xl leading-none">+</span>
                        <span>Add round</span>
                    </button>

                    {/* Divider before submit */}
                    <div className="border-t border-blue-100 pt-6">
                        <button
                            type="submit"
                            className="bg-primary-blue text-white px-10 py-2.5 text-sm font-bold tracking-widest uppercase hover:bg-blue-800 transition-colors duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
