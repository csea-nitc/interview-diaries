"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type Company = {
    id: string;
    slug?: string;
    name: string;
    logoUrl: string;
    highestCtc: number;
    fullTime: number;
    ppo: number;
    interns: number;
};

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"Highest CTC" | "Full Time Offers" | "PPO" | "Interns">("Highest CTC");

    const formatCTC = (ctc: any) => {
        if (!ctc) return "₹0 Lakhs";
        if (ctc > 1000) return `₹${(ctc / 100000).toFixed(1).replace('.0', '')} Lakhs`;
        return `₹${Number(ctc).toFixed(1).replace('.0', '')} Lakhs`;
    };

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const res = await fetch("http://localhost:1337/api/companies");
                const json = await res.json();
                const formattedCompanies = json.data.map((c: any) => ({
                    id: c.documentId,
                    name: c.name,
                    slug: c.slug,
                    logoUrl: c.logoUrl,
                    highestCtc: c.highestCtc,
                    fullTime: c.fullTime,
                    ppo: c.ppo,
                    interns: c.interns,
                }));
                // Initial load: don't sort here, state logic handles it
                setCompanies(formattedCompanies);
            } catch (err) {
                console.error("Failed to fetch companies", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCompanies();
    }, []);

    const filteredAndSortedCompanies = [...companies]
        .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "Highest CTC") return (b.highestCtc || 0) - (a.highestCtc || 0);
            if (sortBy === "Full Time Offers") return (b.fullTime || 0) - (a.fullTime || 0);
            if (sortBy === "PPO") return (b.ppo || 0) - (a.ppo || 0);
            if (sortBy === "Interns") return (b.interns || 0) - (a.interns || 0);
            return 0;
        });

    return (
        <div className="w-full flex-1 flex flex-col font-mono text-base bg-white overflow-hidden">
            {/* Header banner */}
            <div className="w-full bg-primary-blue text-white px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between shrink-0 gap-4">
                <span className="text-2xl tracking-wider hover:opacity-90">COMPANIES</span>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-white/70 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-primary-blue border border-white/30 text-white text-sm pl-9 pr-4 py-2 rounded outline-none placeholder:text-white/70 w-full focus:border-white transition-colors"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-primary-blue border border-white/30 text-white text-sm px-4 py-2 rounded outline-none cursor-pointer w-full sm:w-auto"
                    >
                        <option value="Highest CTC">Highest CTC</option>
                        <option value="Full Time Offers">Full Time Offers</option>
                        <option value="PPO">PPO</option>
                        <option value="Interns">Interns</option>
                    </select>
                </div>
            </div>

            {/* Content area */}
            <div className="w-full flex-1 overflow-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-40 text-primary-blue">Loading companies...</div>
                ) : (
                    <>
                        {/* Mobile Cards (Hidden on Desktop) */}
                        <div className="flex flex-col md:hidden p-4 gap-4 pb-12 w-full font-mono">
                            {filteredAndSortedCompanies.map((company, index) => (
                                <div key={company.id} className="border border-blue-200/60 p-4 bg-white flex flex-col relative w-full pointer-events-auto hover:bg-[#f8fbff] transition-colors shadow-sm">
                                    <Link href={`/companies/${company.slug}`} className="absolute inset-0 z-0 bg-transparent"></Link>
                                    <div className="flex items-center gap-4 mb-4 z-10 pointer-events-none">
                                        <div className="w-14 h-14 border border-blue-100/60 rounded-sm bg-white flex items-center justify-center shrink-0 p-1">
                                            {company.logoUrl ? (
                                                <img src={company.logoUrl} alt={company.name} className="max-w-full max-h-full object-contain" />
                                            ) : (
                                                <span className="text-gray-300 text-lg leading-none">{company.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <h2 className="text-primary-blue text-lg tracking-wide">{company.name}</h2>
                                    </div>
                                    <div className="flex flex-col gap-2 z-10 pointer-events-none text-primary-blue">
                                        <div className="text-sm uppercase flex gap-2 items-center">
                                            <span className="font-normal opacity-70">HIGHEST CTC:</span> 
                                            <span className="font-semibold text-sm">{formatCTC(company.highestCtc)}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-xs uppercase opacity-90 mt-1">
                                            <div><span className="font-normal opacity-70">FULL TIME:</span> <span className="font-semibold">{company.fullTime || 0}</span></div>
                                            <div><span className="font-normal opacity-70">PPO:</span> <span className="font-semibold">{company.ppo || 0}</span></div>
                                            <div><span className="font-normal opacity-70">INTERNS:</span> <span className="font-semibold">{company.interns || 0}</span></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredAndSortedCompanies.length === 0 && !loading && (
                                <div className="text-center text-gray-500 italic py-10 border border-blue-100 rounded-lg bg-white shadow-sm">
                                    No companies found.
                                </div>
                            )}
                        </div>

                        {/* Desktop Table */}
                        <table className="hidden md:table w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-blue-100/60 sticky top-0 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-sm z-10">
                                    <th className="px-8 py-5  text-primary-blue text-center w-16 border-r border-blue-100/60 uppercase">#</th>
                                    <th className="px-8 py-5  text-primary-blue border-r border-blue-100/60 uppercase text-center md:text-left md:pl-28">COMPANY</th>
                                    <th className="px-8 py-5  text-primary-blue text-center border-r border-blue-100/60 uppercase">HIGHEST CTC</th>
                                    <th className="px-8 py-5  text-primary-blue text-center border-r border-blue-100/60 uppercase">FULL TIME</th>
                                    <th className="px-8 py-5  text-primary-blue text-center border-r border-blue-100/60 uppercase">PPO</th>
                                    <th className="px-8 py-5  text-primary-blue text-center uppercase">INTERNS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedCompanies.map((company, index) => (
                                    <tr key={company.id} className="border-b border-blue-100/60 hover:bg-[#f8fbff] transition-colors">
                                        <td className="px-8 py-8 text-primary-blue  text-center border-r border-blue-100/60">
                                            {index + 1}
                                        </td>

                                        <td className="px-8 py-8 md:pl-20 flex flex-col md:flex-row md:items-center gap-8 border-r border-blue-100/60 -mb-px">
                                            <div className="w-14 h-14 border border-blue-100/60 rounded-sm bg-white flex items-center justify-center shrink-0 p-1 self-center">
                                                {company.logoUrl ? (
                                                    <img src={company.logoUrl} alt={company.name} className="max-w-full max-h-full object-contain" />
                                                ) : (
                                                    <span className="text-gray-300   text-center leading-none">{company.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <Link href={`/companies/${company.slug}`} className="text-primary-blue  hover:underline self-center md:self-auto text-base">
                                                {company.name}
                                            </Link>
                                        </td>

                                        <td className="px-8 py-8 text-center border-r border-blue-100/60 align-middle">
                                            <span className="text-primary-blue font-semibold text-sm">{formatCTC(company.highestCtc)}</span>
                                        </td>
                                        <td className="px-8 py-8 text-center border-r border-blue-100/60 align-middle">
                                            <span className="text-primary-blue font-semibold text-sm">{company.fullTime || 0}</span>
                                        </td>
                                        <td className="px-8 py-8 text-center border-r border-blue-100/60 align-middle">
                                            <span className="text-primary-blue font-semibold text-sm">{company.ppo || 0}</span>
                                        </td>
                                        <td className="px-8 py-8 text-center align-middle">
                                            <span className="text-primary-blue font-semibold text-sm">{company.interns || 0}</span>
                                        </td>
                                    </tr>
                                ))}
                                {filteredAndSortedCompanies.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500 italic border-b border-blue-100/60">
                                            No companies found. Add some from the admin panel!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}
