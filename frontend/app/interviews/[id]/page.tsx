"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import { strapiRequest } from "@/lib/strapiRequest";

export default function InterviewDiaryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { loading: authLoading } = useAuth();

    const [diary, setDiary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        async function fetchData() {
            try {
                const res = await strapiRequest(`/api/interview-diaries/${id}?populate=*`);
                const json = await res.json();
                if (json.data) setDiary(json.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id, authLoading]);

    const formatCTC = (ctc: any) => {
        if (!ctc) return null;
        if (ctc > 1000) return `₹${(ctc / 100000).toFixed(1).replace(".0", "")} Lakhs`;
        return `₹${ctc}`;
    };

    if (loading)
        return <div className="p-8 text-sm font-mono text-gray-500">Loading...</div>;

    if (!diary)
        return <div className="p-8 text-sm font-mono text-red-500">Not found</div>;

    const company = diary.company;
    const rounds = diary.rounds || [];

    return (
        <div className="w-full bg-white font-sans px-6 md:px-16 lg:px-24 pt-8 pb-20">

            {/* BACK */}
            <Link
                href={`/companies/${company?.slug || ""}`}
                className="text-primary-blue text-xs font-mono mb-8 block"
            >
                ← BACK
            </Link>
            {/* HEADER */}
            <div className="mb-12 border-b border-blue-300 pb-3 flex items-center gap-5">

                {/* LOGO */}
                <div className="w-12 h-12 flex items-center justify-center">
                    {company?.logoUrl ? (
                        <img src={company.logoUrl} className="max-h-full object-contain" />
                    ) : (
                        <div className="w-6 h-6 bg-neutral-300" />
                    )}
                </div>

                {/* TEXT */}
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-primary-blue">
                        {company?.name}
                    </h1>

                    <p className="text-xs mt-2 font-mono uppercase tracking-wide text-primary-blue">
                        {diary.jobTitle || diary.roleType} • {diary.year} • {diary.candidateName}
                    </p>
                </div>
            </div>


            {/* KEY VALUE LIST */}
            <div className="text-xs font-mono uppercase text-primary-blue space-y-2 mb-10">

                {/* COMPENSATION */}
                {(diary.ctc || diary.stipend) && (
                    <div className="flex justify-between border-b border-neutral-200 pb-1">
                        <span>{diary.ctc ? "CTC" : "Stipend"}</span>
                        <span>
                            : {diary.ctc
                                ? formatCTC(diary.ctc)
                                : `${diary.stipend}${diary.relocation ? ` (+${diary.relocation} relocation)` : ""}`
                            }
                        </span>
                    </div>
                )}

                {/* TOTAL ROUNDS */}
                <div className="flex justify-between border-b border-neutral-200 pb-1">
                    <span>Total Rounds</span>
                    <span>: {diary.totalRounds || rounds.length}</span>
                </div>

                {/* TEST ROUNDS */}
                <div className="flex justify-between border-b border-neutral-200 pb-1">
                    <span>Test Rounds</span>
                    <span>: {diary.writtenTests || 0}</span>
                </div>

                {/* INTERVIEW ROUNDS */}
                <div className="flex justify-between border-b border-neutral-200 pb-1">
                    <span>Interview Rounds</span>
                    <span>: {diary.interviews || rounds.length}</span>
                </div>

            </div>
            {/* ROUNDS */}
            <div className="space-y-10">

                {rounds.length > 0 ? (
                    rounds.map((round: any, idx: number) => (
                        <div key={idx} className="border-l-2 border-blue-100 pl-6 relative">

                            <div className="absolute -left-3 top-1 w-6 h-6 bg-primary-blue text-white text-xs flex items-center justify-center rounded-full font-mono">
                                {idx + 1}
                            </div>

                            <h2 className="text-lg font-display text-primary-blue mb-2">
                                {round.name || `Round ${idx + 1}`}
                            </h2>

                            <p className="text-sm text-secondary-blue whitespace-pre-line leading-relaxed">
                                {round.descriptions}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No round details provided.</p>
                )}

            </div>

            {/* TIPS */}
            {diary.tips && (
                <div className="mt-14">

                    <div className="py-2 text-primary-blue font-semibold font-display mb-4">
                        Tips
                    </div>

                    <p className="text-sm text-secondary-blue">
                        {diary.tips}
                    </p>

                </div>
            )}

        </div>
    );
}