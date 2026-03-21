"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar({ companies = [] }: { companies?: any[] }) {
    const pathname = usePathname();
    const isCompaniesActive = pathname.startsWith("/companies");

    // Determine active company if on a specific company page
    const activeCompanySlug = pathname.match(/\/companies\/([^/]+)/)?.[1];

    return (
        <aside className="w-72 bg-[#f8fbff] min-h-dvh flex flex-col border-r border-blue-100 shrink-0 font-mono text-base shadow-sm overflow-y-auto">
            <div className="flex flex-col mt-4">

                <Link
                    href="/"
                    className={`px-8 py-5 font-bold text-primary-blue border-b border-blue-100 uppercase hover:bg-blue-50 transition`}
                >
                    ABOUT
                </Link>

                <div className="flex flex-col">
                    <Link
                        href="/companies"
                        className={`px-8 py-5 font-bold uppercase border-b border-transparent transition flex items-center gap-2
                            ${isCompaniesActive && !activeCompanySlug ? "bg-primary-blue text-white" : "text-primary-blue hover:bg-blue-50"}
                        `}
                    >
                        {(isCompaniesActive || activeCompanySlug) && (
                            <span className="text-[10px] leading-none">▼</span>
                        )}
                        {!isCompaniesActive && !activeCompanySlug && (
                            <span className="text-[10px] leading-none">▶</span>
                        )}
                        COMPANIES
                    </Link>

                    {/* Sub-companies list (always expanded if we are in companies routes, or just always show for MVP) */}
                    <div className="flex flex-col bg-[#f8fbff]">
                        {companies.map((company) => {
                            const isActive = activeCompanySlug === company.slug;
                            return (
                                <Link
                                    key={company.documentId}
                                    href={`/companies/${company.slug}`}
                                    className={`pl-12 pr-6 py-4 border-b border-blue-100 uppercase transition font-semibold text-sm
                                        ${isActive ? "bg-primary-blue text-white" : "text-secondary-blue hover:bg-blue-50"}
                                    `}
                                >
                                    {isActive && <span className="inline-block w-0 relative right-4 text-white">▶</span>}
                                    {company.name}
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <Link
                    href="/share-experience"
                    className={`px-8 py-5 font-bold text-secondary-blue border-b border-blue-100 uppercase hover:bg-blue-50 transition
                        ${pathname === "/share-experience" ? "text-primary-blue" : ""}
                    `}
                >
                    SHARE YOUR EXPERIENCE
                </Link>
            </div>
        </aside>
    );
}
