"use client";

import { useEffect, useState } from "react";

type Company = {
    id: number;
    name: string;
    logoUrl: string;
    highestCtc: number;
    fullTime: number;
    ppo: number;
    interns: number;
};

export default function CompaniesTable() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const res = await fetch("/api/companies");
                const data = await res.json();
                setCompanies(data.companies);
            } catch (err) {
                console.error("Failed to fetch companies", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCompanies();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 p-6 text-gray-500">
                Loading companies...
            </div>
        );
    }

    return (
        <div className="flex-1 min-h-screen bg-[#f6f7f9] p-6">
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-700 px-4 py-2 rounded-t-md">
                <h2 className="text-white font-semibold tracking-wide">
                    COMPANIES
                </h2>

                <select className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md outline-none">
                    <option value="ctc">Highest CTC</option>
                    <option value="name">Name</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white border border-blue-200 rounded-b-md overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-blue-50 text-blue-700">
                            <th className="border px-3 py-2 text-left w-12">#</th>
                            <th className="border px-3 py-2 text-left">COMPANY</th>
                            <th className="border px-3 py-2 text-center">HIGHEST CTC</th>
                            <th className="border px-3 py-2 text-center">FULL TIME</th>
                            <th className="border px-3 py-2 text-center">PPO</th>
                            <th className="border px-3 py-2 text-center">INTERNS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {companies.map((company, idx) => (
                            <tr key={company.id} className="even:bg-gray-50">
                                <td className="border px-3 py-3">{idx + 1}</td>

                                <td className="border px-3 py-3 flex items-center gap-3">
                                    <div className="w-10 h-10 border rounded bg-white flex items-center justify-center">
                                        <img
                                            src={company.logoUrl}
                                            alt={company.name}
                                            className="max-w-full max-h-full"
                                        />
                                    </div>
                                    <span className="text-blue-700 font-medium">
                                        {company.name}
                                    </span>
                                </td>

                                <td className="border px-3 py-3 text-center text-blue-700 font-medium">
                                    ₹{(company.highestCtc / 100000).toFixed(0)} Lakhs
                                </td>

                                <td className="border px-3 py-3 text-center">
                                    {company.fullTime}
                                </td>

                                <td className="border px-3 py-3 text-center">
                                    {company.ppo}
                                </td>

                                <td className="border px-3 py-3 text-center">
                                    {company.interns}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
