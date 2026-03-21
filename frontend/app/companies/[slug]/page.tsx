"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";

export default function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [company, setCompany] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [typeFilter, setTypeFilter] = useState<"All" | "Full Time" | "Internship">("All");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    `http://localhost:1337/api/companies?filters[slug][$eq]=${slug}&populate[diaries][populate]=*`
                );
                const json = await res.json();
                if (json.data && json.data.length > 0) {
                    setCompany(json.data[0]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);

    if (loading) return <div className="p-8 text-gray-500 font-mono text-sm">Loading company details...</div>;
    if (!company) return <div className="p-8 text-red-500 font-mono text-sm">Company not found.</div>;

    const diaries = company.diaries || [];
    const uniqueYears = Array.from(new Set(diaries.map((d: any) => d.year || new Date().getFullYear()))) as number[];
    const years = uniqueYears.sort((a, b) => b - a);
    if (years.length > 0 && !years.includes(selectedYear)) {
        setSelectedYear(years[0]);
    }

    const currentYearDiaries = diaries.filter((d: any) => (d.year || new Date().getFullYear()) === selectedYear);
    const filteredDiaries = typeFilter === "All"
        ? currentYearDiaries
        : currentYearDiaries.filter((d: any) => d.roleType === typeFilter);
    const fullTimeDiaries = filteredDiaries.filter((d: any) => d.roleType === "Full Time");
    const internshipDiaries = filteredDiaries.filter((d: any) => d.roleType === "Internship");

    const formatCTC = (ctc: any) => {
        if (!ctc) return "₹0 Lakhs";
        if (ctc > 1000) return `₹${(ctc / 100000).toFixed(1).replace('.0', '')} Lakhs`;
        return `₹${Number(ctc).toFixed(1).replace('.0', '')} Lakhs`;
    };

    const RadioTitle = ({ title }: { title: string }) => (
        <div className="flex items-center gap-2 border border-primary-blue rounded-full px-4 py-1 w-fit">
            <div className="w-2 h-2 rounded-full bg-primary-blue shrink-0" />
            <span className="text-sm font-bold text-primary-blue uppercase tracking-wide">{title}</span>
        </div>
    );

    return (
        <div className="flex-1 w-full bg-white font-mono flex flex-col pt-6 px-6 md:pt-10 md:px-16 lg:px-20 overflow-x-hidden">
            <Link href="/companies" className="text-primary-blue text-sm font-bold flex items-center gap-1 mb-6 md:mb-8 hover:underline uppercase">
                <span className="text-[10px]">◀</span> BACK
            </Link>

            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 mb-4">
                <div className="w-20 h-14 md:w-24 md:h-16 flex items-center justify-center border-2 border-primary-blue rounded-full shrink-0 overflow-hidden px-2">
                    {company.logoUrl ? (
                        <img src={company.logoUrl} alt={company.name} className="max-w-full max-h-full object-contain" />
                    ) : (
                        <span className="text-2xl font-bold text-primary-blue border-b-2 border-red-500">{company.name.charAt(0)}</span>
                    )}
                </div>
                <div className="flex flex-col max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary-blue mb-2 md:mb-3 tracking-wide leading-none font-mono">{company.name}</h1>
                    <p className="text-base text-secondary-blue font-medium leading-relaxed mt-2 font-sans w-fit">
                        {company.description || "Dignissim facilisis penatibus tristique a ullamcorper fringilla pellentesque ipsum aliquam. Nec nunc pharetra velit ipsum scelerisque"}
                    </p>
                </div>
            </div>

            <hr className="border-t border-blue-100/60 my-8" />

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16 mb-8 md:mb-12">
                <div className="md:w-48 shrink-0">
                    <RadioTitle title="SUMMARY" />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="bg-[#f2f8fc] px-4 py-2 font-bold text-primary-blue text-base w-full mb-6 relative left-[-8px]">
                        Full time
                    </div>

                    <div className="flex flex-wrap gap-x-12 gap-y-8 text-sm font-semibold uppercase text-secondary-blue tracking-wider mb-10 w-full">
                        <div className="flex flex-col w-full md:w-[300px]">
                            <div className="bg-primary-blue text-white px-2 py-0.5 inline-block w-fit mb-3"><span className="text-[8px] mr-1">▶</span> SOFTWARE DEV</div>
                            <div className="flex justify-between py-2 border-b border-blue-100/60"><span className="w-40 text-primary-blue">CAMPUS OFFERS</span> <span className="text-secondary-blue">: {company.fullTime || 0}</span></div>
                            <div className="flex justify-between py-2 border-b border-blue-100/60"><span className="w-40 text-primary-blue">PPO</span> <span className="text-secondary-blue">: {company.ppo || 0}</span></div>
                            <div className="flex justify-between py-2 border-b border-blue-100/60"><span className="w-40 text-primary-blue">EXTERNAL OFFERS</span> <span className="text-secondary-blue">: 0</span></div>
                            <div className="flex justify-between py-2 border-b border-blue-100/60"><span className="w-40 text-primary-blue">CTC</span> <span className="text-secondary-blue">: {formatCTC(company.highestCtc)}</span></div>
                        </div>
                        <div className="flex flex-col w-full md:w-[300px]">
                            <div className="bg-primary-blue text-white px-2 py-0.5 inline-block w-fit mb-3"><span className="text-[8px] mr-1">▶</span> SYSTEMS ENGINEER</div>
                            <div className="flex justify-between py-2 border-b border-blue-100/60"><span className="w-40 text-primary-blue">CAMPUS OFFERS</span> <span className="text-secondary-blue">: 0</span></div>
                            <div className="flex justify-between py-2 border-b border-blue-100/60"><span className="w-40 text-primary-blue">CTC</span> <span className="text-secondary-blue">: ₹0 Lakhs</span></div>
                        </div>
                    </div>

                    <div className="bg-[#f2f8fc] px-4 py-2 font-bold text-primary-blue text-base w-full mb-6 relative left-[-8px]">
                        Internship
                    </div>

                    <div className="flex flex-wrap gap-x-12 gap-y-8 text-sm font-semibold uppercase text-secondary-blue tracking-wider w-full">
                        <div className="flex flex-col w-full md:w-[300px]">
                            <div className="bg-primary-blue text-white px-2 py-0.5 inline-block w-fit mb-3"><span className="text-[8px] mr-1">▶</span> SOFTWARE DEV</div>
                            <div className="flex justify-between py-2 border-b border-blue-100/60"><span className="w-40 text-primary-blue">CAMPUS OFFERS</span> <span className="text-secondary-blue">: {company.interns || 0}</span></div>
                            <div className="flex justify-between py-2 border-b border-blue-100/60"><span className="w-40 text-primary-blue">STIPEND</span> <span className="text-secondary-blue">: ₹1.5 LAKHS</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-t border-blue-100/60 mb-8" />

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16 pb-24">
                <div className="md:w-48 shrink-0">
                    <RadioTitle title="DIARIES" />
                </div>
                <div className="flex-1 flex flex-col w-full max-w-[800px]">
                    <div className="flex flex-col md:flex-row justify-between mb-8 items-start md:items-center gap-4">
                        {/* Year pills */}
                        <div className="flex gap-2 flex-wrap">
                            {years.map(y => (
                                <button
                                    key={y}
                                    onClick={() => setSelectedYear(y)}
                                    className={`border px-4 py-1 rounded-full text-sm font-bold uppercase transition flex items-center gap-1 border-primary-blue text-primary-blue`}
                                >
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${selectedYear === y ? "bg-primary-blue" : "bg-transparent border border-primary-blue"}`} />
                                    {y}
                                </button>
                            ))}
                        </div>
                        {/* Type filter */}
                        <div className="flex gap-2">
                            {(["All", "Full Time", "Internship"] as const).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTypeFilter(t)}
                                    className={`text-xs font-bold uppercase px-3 py-1 border transition ${
                                        typeFilter === t
                                            ? "bg-primary-blue text-white border-primary-blue"
                                            : "border-primary-blue text-primary-blue hover:bg-blue-50"
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#f2f8fc] px-4 py-2 font-bold text-primary-blue text-lg w-full mb-4 relative left-[-8px]">
                        Full time
                    </div>

                    <div className="flex flex-col mb-10 w-[95%]">
                        {fullTimeDiaries.length === 0 ? (
                            <p className="text-sm text-secondary-blue">No full-time diaries found for {selectedYear}</p>
                        ) : fullTimeDiaries.map((diary: any, idx: number) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-blue-100/60 group">
                                <div className="flex flex-col">
                                    <span className="text-base font-bold text-primary-blue mb-1">{diary.candidateName}</span>
                                    <span className="text-sm font-bold text-secondary-blue uppercase tracking-widest mt-1 bg-white border border-transparent group-hover:bg-[#f2f8fc] w-fit">
                                        {diary.jobTitle || diary.roleType} {diary.stipend?.substring(0, 20) || ""}
                                    </span>
                                </div>
                                <Link href={`/interviews/${diary.documentId}`} className="border border-primary-blue rounded-full px-6 py-2 text-sm font-bold text-primary-blue hover:bg-[#f8fbff] uppercase w-fit mt-3 sm:mt-0">
                                    VIEW DETAILS
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#f2f8fc] px-4 py-2 font-bold text-primary-blue text-lg w-full mb-4 relative left-[-8px]">
                        Internship
                    </div>

                    <div className="flex flex-col w-[95%]">
                        {internshipDiaries.length === 0 ? (
                            <p className="text-sm text-secondary-blue">No internship diaries found for {selectedYear}</p>
                        ) : internshipDiaries.map((diary: any, idx: number) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-blue-100/60 group">
                                <div className="flex flex-col">
                                    <span className="text-base font-bold text-primary-blue mb-1">{diary.candidateName}</span>
                                    <span className="text-sm font-bold text-secondary-blue uppercase tracking-widest mt-1 bg-white border border-transparent group-hover:bg-[#f2f8fc] w-fit">
                                        {diary.jobTitle || diary.roleType} {diary.stipend?.substring(0, 20) || ""}
                                    </span>
                                </div>
                                <Link href={`/interviews/${diary.documentId}`} className="border border-primary-blue rounded-full px-6 py-2 text-sm font-bold text-primary-blue hover:bg-[#f8fbff] uppercase w-fit mt-3 sm:mt-0">
                                    VIEW DETAILS
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
