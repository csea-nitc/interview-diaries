"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
                // sort them by CTC for now
                setCompanies(formattedCompanies.sort((a: any, b: any) => b.highestCtc - a.highestCtc));
            } catch (err) {
                console.error("Failed to fetch companies", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCompanies();
    }, []);

    return (
        <div className="w-full flex-1 flex flex-col font-mono text-base bg-white overflow-hidden">
            {/* Header banner */}
            <div className="w-full bg-primary-blue text-white px-8 py-4 flex items-center justify-between shrink-0">
                <span className="text-2xl  tracking-wider hover:opacity-90">COMPANIES</span>
                <select className="bg-primary-blue border border-white/30 text-white text-sm px-4 py-2 rounded outline-none cursor-pointer">
                    <option>Highest CTC</option>
                    <option>Full Time Offers</option>
                    <option>PPO</option>
                    <option>Interns</option>
                </select>
            </div>

            {/* Table */}
            <div className="w-full flex-1 overflow-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-40 text-primary-blue">Loading companies...</div>
                ) : (
                    <table className="w-full text-left border-collapse whitespace-nowrap">
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
                            {companies.map((company, index) => (
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
                                        <span className="text-primary-blue font-semibold text-sm">₹{(company.highestCtc / 100000).toFixed(0)} LAKHS</span>
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
                            {companies.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 italic border-b border-blue-100/60">
                                        No companies found. Add some from the admin panel!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
