"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { strapiRequest } from "@/lib/strapiRequest";

export function Sidebar() {
    const pathname = usePathname();
    const [companies, setCompanies] = useState<any[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const isCompaniesActive = pathname.startsWith("/companies");
    const activeCompanySlug = pathname.match(/\/companies\/([^/]+)/)?.[1];

    useEffect(() => {
        if (isCompaniesActive) {
            setIsExpanded(true);
        }
    }, [isCompaniesActive]);

    useEffect(() => {
        strapiRequest("/api/companies?pagination[pageSize]=200&sort=name:asc")
            .then((r) => r.json())
            .then((j) => { if (j?.data) setCompanies(j.data); })
            .catch(() => { });

        const handleLogout = () => {
            setIsExpanded(false);
            setCompanies([]);
        };
        window.addEventListener("auth:logout", handleLogout);
        return () => window.removeEventListener("auth:logout", handleLogout);
    }, []);

    return (
        <aside className="w-72 bg-[#f8fbff] px-3 text-sm min-h-dvh flex-col border-r border-blue-200 shrink-0 font-mono  text-base shadow-sm overflow-y-auto hidden md:flex">
            <div className="flex flex-col mt-4">

                <Link
                    href="/"
                    className={`px-8 py-3   text-primary-blue border-b border-blue-200 uppercase hover:bg-blue-50 transition`}
                >
                    ABOUT
                </Link>

                <div className="flex flex-col">
                    <Link
                        href="/companies"
                        onClick={(e) => {
                            if (isCompaniesActive && !activeCompanySlug) {
                                e.preventDefault();
                                setIsExpanded(!isExpanded);
                            }
                        }}
                        className={`px-8 py-3  uppercase border-b border-transparent transition flex items-center gap-2
                            ${isCompaniesActive && !activeCompanySlug ? "bg-primary-blue text-white" : "text-primary-blue hover:bg-blue-50"}
                        `}
                    >
                        {isExpanded ? (
                            <span className="text-[10px] leading-none">▼</span>
                        ) : (
                            <span className="text-[10px] leading-none">▶</span>
                        )}
                        COMPANIES
                    </Link>

                    {/* Sub-companies list */}
                    {isExpanded && (
                        <div className="flex flex-col mx-4 bg-[#f8fbff]">
                            {companies.map((company) => {
                                const isActive = activeCompanySlug === company.slug;
                                return (
                                    <Link
                                        key={company.documentId}
                                        href={`/companies/${company.slug}`}
                                        className={`px-6 py-2 border-b border-blue-200 uppercase transition  text-sm
                                        ${isActive ? "bg-primary-blue text-white" : "text-secondary-blue hover:bg-blue-50"}
                                    `}
                                    >
                                        {isActive && <span className="inline-block w-0 relative right-4 text-white">▶</span>}
                                        {company.name}
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>

                <Link
                    href="/share-experience"
                    className={`px-8 py-3  text-secondary-blue border-b border-blue-200 uppercase hover:bg-blue-50 transition
                        ${pathname === "/share-experience" ? "text-primary-blue" : ""}
                    `}
                >
                    SHARE YOUR EXPERIENCE
                </Link>
            </div>
        </aside>
    );
}
