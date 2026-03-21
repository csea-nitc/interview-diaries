"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function InterviewDiaryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [diary, setDiary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch the specific diary and populate company and rounds
                const res = await fetch(`http://localhost:1337/api/interview-diaries/${id}?populate=*`);
                const json = await res.json();
                if (json.data) {
                    setDiary(json.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) return <div className="p-8 text-gray-500">Loading interview details...</div>;
    if (!diary) return <div className="p-8 text-red-500">Interview diary not found.</div>;

    const company = diary.company;
    const rounds = diary.rounds || [];

    return (
        <div className="bg-[#f8fbff] flex-1 flex flex-col font-mono overflow-x-hidden">
            <section className="flex-1 bg-white px-8 md:px-16 py-10 max-w-5xl mx-auto w-full shadow-sm min-h-screen">
                <Link href={`/companies/${company?.slug || ''}`} className="inline-flex items-center gap-2 text-primary-blue font-bold text-xs hover:underline mb-8 uppercase">
                    <span className="text-[10px]">◀</span> BACK TO {company?.name?.toUpperCase() || 'COMPANY'}
                </Link>

                {/* HEADER */}
                <header className="mb-8 flex flex-col gap-3">
                    <span className="order-2 md:order-1 inline-flex items-center justify-center md:justify-start text-xs sm:text-sm font-semibold text-white bg-blue-800 px-3 py-[0.1rem] w-fit rounded-sm shadow-sm">
                        ▶ {diary.candidateName}
                    </span>

                    <div className="order-3 md:order-2 text-xs sm:text-sm font-semibold text-blue-800 text-center md:text-left mt-2 md:mt-0">
                        {diary.year || new Date().getFullYear()} | {diary.roleType}
                    </div>

                    <h1 className="order-1 md:order-3 text-2xl sm:text-3xl md:text-3xl font-bold text-blue-900 text-center md:text-left tracking-tight">
                        {diary.jobTitle || diary.roleType} - {company?.name}
                    </h1>

                    <p className="order-4 text-xs sm:text-sm text-gray-500 text-center md:text-left mt-1">
                        Experience · {diary.year} · {diary.totalRounds || rounds.length} Interview Rounds
                    </p>
                </header>

                <div className="pt-8 border-t-2 border-primary-blue my-2 opacity-20" />
                
                {/* CONTENT */}
                <div className="w-full text-sm sm:text-base md:text-lg leading-relaxed mt-6">
                    
                    {diary.stipend && (
                        <div className="bg-light-blue border border-blue-100 px-4 sm:px-5 py-3 mb-8 rounded shadow-sm">
                            <p className="text-secondary-blue flex items-center gap-2">
                                <span className="font-semibold text-primary-blue capitalize">{diary.roleType === 'Internship' ? 'Stipend' : 'Compensation'}:</span> 
                                {diary.stipend}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 text-secondary-blue font-medium bg-gray-50 p-4 rounded border">
                        <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Total Rounds: {diary.totalRounds || rounds.length}</p>
                        <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Written Tests: {diary.writtenTests || 0}</p>
                        <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Interviews: {diary.interviews || rounds.length}</p>
                    </div>

                    <div className="space-y-10 text-gray-700">
                        {rounds.length > 0 ? rounds.map((round: any, idx: number) => (
                            <section key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-blue-100 pb-2">
                                <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-primary-blue text-white flex items-center justify-center text-[10px] font-bold shadow-sm">{idx + 1}</span>
                                <h2 className="text-lg sm:text-xl font-bold text-primary-blue mb-3">
                                    {round.name || `Round ${idx + 1}`}
                                </h2>
                                <div className="text-secondary-blue bg-white whitespace-pre-line leading-relaxed">
                                    {round.descriptions}
                                </div>
                            </section>
                        )) : (
                            <p className="text-gray-500 italic">No specific round details provided for this experience.</p>
                        )}
                    </div>

                    {diary.tips && (
                        <section className="pt-10 mt-6 border-t border-gray-100">
                            <h3 className="font-bold text-lg sm:text-xl text-primary-blue mb-3 flex items-center gap-2">
                                💡 Preparation Tips
                            </h3>
                            <div className="text-secondary-blue bg-light-blue p-5 rounded italic shadow-sm border border-blue-100">
                                "{diary.tips}"
                            </div>
                        </section>
                    )}

                    <section className="pt-10 mb-10">
                        <h3 className="font-semibold text-lg sm:text-xl text-primary-blue mb-3">
                            Resources
                        </h3>
                        <a
                            href="https://www.geeksforgeeks.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary-blue hover:text-primary-blue hover:underline flex items-center gap-1 w-fit"
                        >
                            GeeksforGeeks – Interview Preparation ↗
                        </a>
                    </section>
                </div>
            </section>
        </div>
    );
}
