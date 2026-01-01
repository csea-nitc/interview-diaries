"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

const diariesData: Record<
    number,
    {
        fullTime: { name: string; role: string }[];
        internship: { name: string; role: string }[];
    }
> = {
    2025: {
        fullTime: [
            { name: "Aadhavan P Levin", role: "SYSTEMS ENGINEER '23 IPA" },
            { name: "Jane Doe", role: "SYSTEMS ENGINEER '23 IPA" },
        ],
        internship: [
            { name: "Aadhavan P Levin", role: "SOFTWARE DEV '23-1" },
        ],
    },
    2024: {
        fullTime: [
            { name: "Rahul K", role: "SOFTWARE DEV '22 IPA" },
        ],
        internship: [],
    },
    2023: {
        fullTime: [],
        internship: [],
    },
    2022: {
        fullTime: [],
        internship: [],
    },
};

export default function OraclePage() {
    const [selectedYear, setSelectedYear] = useState<number>(2025);

    const data = diariesData[selectedYear];
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}


            <div className="px-8 py-8">
                {/* Company Header */}
                <div className="mb-6">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm">
                        <ChevronLeft className="w-4 h-4" />
                        <span>BACK</span>
                    </button>

                    <div className="flex items-start gap-8 mb-8">
                        <div className="w-20 h-20 flex items-center justify-center">
                            <span className="text-6xl font-bold text-red-600">O</span>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">Oracle</h1>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Dignissim Mauris pertinitus insique a ullamcorper Irequis pelientesque esum ulgniem. Nac nunc
                                pharenta velit esum scelerisque
                            </p>
                        </div>

                    </div>

                    {/* Full Time Section */}
                    <div className="mb-8 ">
                        <button className="px-6 py-1.5 border border-blue-600 text-blue-600 rounded text-sm font-medium hover:bg-blue-100">
                            SUMMARY
                        </button>
                        <h2 className="text-lg font-semibold text-[#0430CA] bg-blue-100 mb-4">Full time</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Software Dev */}
                            <div>
                                <div className="bg-[#0430CA] text-white text-xs font-semibold px-3 py-1.5">
                                    SOFTWARE DEV
                                </div>
                                <div className="border-gray-300 p-3">
                                    <div className="flex items-center mb-2">
                                        <span className="text-xs text-[#0430CA] font-semibold w-32">CAMPUS OFFERS</span>
                                        <span className="text-xs text-gray-600">: 1-4</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <span className="text-xs text-[#0430CA] font-semibold w-32">PPO</span>
                                        <span className="text-xs text-gray-600">: 1-12</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <span className="text-xs text-[#0430CA] font-semibold w-32">EXTERNAL OFFERS</span>
                                        <span className="text-xs text-gray-600">: 1-4</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-xs text-[#0430CA] font-semibold w-32">CTC</span>
                                        <span className="text-xs text-gray-600">: ₹20 LAKHS</span>
                                    </div>
                                </div>
                            </div>

                            {/* Systems Engineer */}
                            <div>
                                <div className="bg-[#0430CA] text-white text-xs font-semibold px-3 py-1.5">
                                    SYSTEMS ENGINEER
                                </div>
                                <div className=" border-gray-300 p-3">
                                    <div className="flex items-center mb-2">
                                        <span className="text-xs text-[#0430CA] font-semibold w-32">CAMPUS OFFERS</span>
                                        <span className="text-xs text-gray-600">: 1-4</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-xs text-[#0430CA] font-semibold w-32">CTC</span>
                                        <span className="text-xs text-gray-600">: ₹20 LAKHS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Internship Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#0430CA] bg-blue-100 mb-4">Internship</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="bg-[#0430CA] text-white text-xs font-semibold px-3 py-1.5">
                                    SOFTWARE DEV
                                </div>
                                <div className=" border-gray-300 p-3">
                                    <div className="flex items-center mb-2">
                                        <span className="text-xs text-[#0430CA] font-semibold w-32">CAMPUS OFFERS</span>
                                        <span className="text-xs text-gray-600">: 1-4</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-xs text-[#0430CA] font-semibold w-32">STIPEND</span>
                                        <span className="text-xs text-gray-600">: ₹1.5 LAKHS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Diaries Section */}
                <div className="flex items-center justify-between mb-8">
                    <button className="px-6 py-1.5 border border-blue-600 text-blue-600 rounded text-sm font-medium hover:bg-blue-100">
                        DIARIES
                    </button>

                    <div className="flex items-center gap-2">
                        {[2025, 2024, 2023, 2022].map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year as any)}
                                className={`px-5 py-1.5 rounded-full text-sm font-medium transition
                  ${selectedYear === year
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>

                    <button className="px-6 py-1.5  text-blue-600 rounded text-sm font-medium hover:bg-blue-100">

                    </button>
                </div>

                {/* FULL TIME */}
                <div className="mb-8">
                    <h3 className="text-base font-semibold text-[#0430CA] bg-blue-100 mb-4">
                        Full time
                    </h3>

                    <div className="space-y-0">
                        {data.fullTime.length === 0 ? (
                            <p className="text-sm text-gray-500 p-4">
                                No full-time entries for {selectedYear}.
                            </p>
                        ) : (
                            data.fullTime.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between border-t border-b border-gray-300 p-4 hover:border-blue-400 transition-colors"
                                >
                                    <div>
                                        <h4 className="font-medium text-[#0430CA] text-xs mb-0.5">
                                            {item.name}
                                        </h4>
                                        <p className="text-xs text-[#0430CA]">{item.role}</p>
                                    </div>

                                    <button className="px-5 py-1.5 border border-blue-600 text-[#0430CA] rounded-4xl text-xs font-medium hover:bg-blue-100">
                                        VIEW DETAILS
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* INTERNSHIP */}
                <div>
                    <h3 className="text-base font-semibold text-[#0430CA] mb-4">
                        Internship
                    </h3>

                    <div className="space-y-0">
                        {data.internship.length === 0 ? (
                            <p className="text-sm text-gray-500 p-4">
                                No internship entries for {selectedYear}.
                            </p>
                        ) : (
                            data.internship.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between border-t border-b border-gray-300 p-4 hover:border-blue-400 transition-colors"
                                >
                                    <div>
                                        <h4 className="font-medium text-xs text-[#0430CA] mb-0.5">
                                            {item.name}
                                        </h4>
                                        <p className="text-xs text-[#0430CA]">{item.role}</p>
                                    </div>

                                    <button className="px-5 py-1.5 border border-blue-600 text-blue-600 rounded-4xl text-xs font-medium hover:bg-blue-100">
                                        VIEW DETAILS
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-8">
            <h3 className="text-base font-semibold text-[#0430CA] bg-blue-100 mb-4 px-2 py-1">
                {title}
            </h3>
            <div>{children}</div>
        </div>
    );
}

function DiaryRow({ name, role }: { name: string; role: string }) {
    return (
        <div className="flex items-center justify-between border-t border-b border-gray-300 p-4 hover:border-blue-400 transition-colors">
            <div>
                <h4 className="font-medium text-xs text-[#0430CA] mb-0.5">
                    {name}
                </h4>
                <p className="text-xs text-[#0430CA]">{role}</p>
            </div>
            <button className="px-5 py-1.5 border border-blue-600 text-[#0430CA] rounded text-xs font-medium hover:bg-blue-100">
                VIEW DETAILS
            </button>
        </div>
    );
}

function Empty() {
    return (
        <p className="text-sm text-gray-500 p-4">
            No entries for this year.
        </p>
    );
}