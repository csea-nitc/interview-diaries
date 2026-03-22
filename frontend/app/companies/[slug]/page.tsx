"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import { strapiRequest } from "@/lib/strapiRequest";

export default function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { loading: authLoading } = useAuth();

    const [company, setCompany] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [typeFilter, setTypeFilter] = useState<"All" | "Full Time" | "Internship">("All");

    useEffect(() => {
        if (authLoading) return;

        async function fetchData() {
            try {
                const res = await strapiRequest(
                    `/api/companies?filters[slug][$eq]=${slug}&populate[diaries][populate]=*`
                );
                const json = await res.json();
                if (json.data?.length > 0) {
                    setCompany(json.data[0]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [slug, authLoading]);

    const diaries = company?.diaries || [];

    const years = Array.from(
        new Set(diaries.map((d: any) => d.year || new Date().getFullYear()))
    ).sort((a: any, b: any) => b - a);

    useEffect(() => {
        if (years.length > 0 && !years.includes(selectedYear)) {
            setSelectedYear(years[0]);
        }
    }, [years]);

    const currentYearDiaries = diaries.filter(
        (d: any) => (d.year || new Date().getFullYear()) === selectedYear
    );

    const filteredDiaries =
        typeFilter === "All"
            ? currentYearDiaries
            : currentYearDiaries.filter((d: any) => d.roleType === typeFilter);

    const formatCTC = (ctc: any) => {
        if (!ctc) return "₹0 Lakhs";
        if (ctc > 1000) return `₹${(ctc / 100000).toFixed(1).replace(".0", "")} Lakhs`;
        return `₹${Number(ctc).toFixed(1).replace(".0", "")} Lakhs`;
    };

    if (loading)
        return <div className="p-8 font-mono text-sm text-gray-500">Loading...</div>;

    if (!company)
        return <div className="p-8 font-mono text-sm text-red-500">Company not found</div>;

    return (
        <div className="w-full bg-white font-sans pt-8">

            {/* BACK */}
            <Link href="/companies" className="text-primary-blue text-xs font-mono mb-8 block px-4 md:px-12">
                ← BACK
            </Link>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 border-b border-blue-200 pb-6 px-4 md:px-12">

                {/* LOGO */}
                <div className="w-14 h-10 md:w-16 md:h-12  rounded-full flex items-center justify-center shrink-0">
                    {company.logoUrl ? (
                        <img src={company.logoUrl} className="max-h-full object-contain" />
                    ) : (
                        <div className="w-6 h-4 border-[3px] ] rounded-full" />
                    )}
                </div>

                {/* TEXT */}
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-display text-primary-blue leading-none">
                        {company.name}
                    </h1>

                    <p className="text-sm text-secondary-blue mt-2 max-w-2xl font-sans leading-relaxed">
                        {company.description ||
                            "Dignissim facilisis penatibus tristique a ullamcorper fringilla pellentesque ipsum aliquam. Nec nunc pharetra velit ipsum scelerisque"}
                    </p>
                </div>

            </div>

            {/* SUMMARY */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12 border-b border-blue-200 pb-6 px-4 md:px-12">

                <div className="w-full md:w-40 shrink-0">
                    <div className="border border-primary-blue rounded-full px-4 py-1 text-xs font-mono text-primary-blue uppercase w-fit">
                        Summary
                    </div>
                </div>

                <div className="flex-1 max-w-[900px]">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                        {/* FULL TIME */}
                        <div>
                            <div className="bg-[#f2f8fc] px-4 py-2 font-display text-primary-blue mb-6">
                                Full time
                            </div>

                            <div className="space-y-2 text-xs font-mono uppercase">
                                <Row label="Campus Offers" value={company.fullTime} />
                                <Row label="PPO" value={company.ppo} />
                                <Row label="External Offers" value={company.external || 0} />
                                <Row label="CTC" value={formatCTC(company.highestCtc)} />
                            </div>
                        </div>

                        {/* INTERNSHIP */}
                        <div>
                            <div className="bg-[#f2f8fc] px-4 py-2 font-display text-primary-blue mb-6">
                                Internship
                            </div>

                            <div className="space-y-2 text-xs font-mono uppercase">
                                <Row label="Offers" value={company.interns} />
                                <Row label="Stipend" value={company.recentStipend} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* DIARIES */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-20 px-4 md:px-12">

                <div className="w-full md:w-40 shrink-0">
                    <div className="border border-primary-blue rounded-full px-4 py-1 text-xs font-mono text-primary-blue uppercase w-fit">
                        Diaries
                    </div>
                </div>

                <div className="flex-1 max-w-[900px]">

                    {/* FILTERS */}
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-8 gap-4">

                        {/* YEARS */}
                        <div className="flex gap-2">
                            {years.map((y) => (
                                <button
                                    key={y}
                                    onClick={() => setSelectedYear(y)}
                                    className={`px-3 py-1 rounded-full text-xs font-mono border ${selectedYear === y
                                        ? "bg-primary-blue text-white"
                                        : "border-primary-blue text-primary-blue"
                                        }`}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>

                        {/* TYPE FILTER */}
                        <div className="flex gap-2">
                            {(["All", "Full Time", "Internship"] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTypeFilter(t)}
                                    className={`px-3 py-1 text-xs font-mono border ${typeFilter === t
                                        ? "bg-primary-blue text-white"
                                        : "border-primary-blue text-primary-blue"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* LIST */}
                    <div className="divide-y divide-blue-100/60">

                        {filteredDiaries.length === 0 ? (
                            <p className="text-sm text-secondary-blue py-6">
                                No diaries found
                            </p>
                        ) : (
                            filteredDiaries.map((d: any, i: number) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-5 border-y border-blue-200">

                                    <div>
                                        <div className="text-primary-blue font-semibold font-sans">
                                            {d.candidateName}
                                        </div>
                                        <div className="text-xs text-secondary-blue font-mono  uppercase mt-1">
                                            {d.jobTitle || d.roleType}{" "}
                                            <span>
                                                
                                            {d.stipend
                                                ? d.stipend
                                                : d.ctc
                                                    ? formatCTC(d.ctc)
                                                    : ""}
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/interviews/${d.documentId}`}
                                        className="px-4 py-2 text-xs font-mono border text-primary-blue border-primary-blue rounded-full w-fit hover:bg-primary-blue hover:text-white transition-colors"
                                    >
                                        View Details
                                    </Link>

                                </div>
                            ))
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

const Row = ({ label, value }: any) => (
    <div className="flex justify-between border-b border-blue-100/60 pb-1">
        <span className="text-primary-blue">{label}</span>
        <span className="text-secondary-blue">: {value}</span>
    </div>
);