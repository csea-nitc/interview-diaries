"use client";

import { useEffect, useRef, useState } from "react";
import { strapiRequest } from "@/lib/strapiRequest";

type Company = { documentId: string; name: string };

export type CompanySelection =
    | { type: "existing"; documentId: string; name: string }
    | { type: "new"; name: string };

interface Props {
    value: CompanySelection | null;
    onChange: (v: CompanySelection) => void;
    error?: string;
}

export function CompanyCombobox({ value, onChange, error }: Props) {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Fetch companies once
    useEffect(() => {
        strapiRequest("/api/companies?pagination[pageSize]=200&sort=name:asc")
            .then((r) => r.json())
            .then((j) => setCompanies(j.data ?? []))
            .catch(() => {});
    }, []);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = companies.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
    );

    const showAddNew =
        query.trim().length >= 2 &&
        !companies.some((c) => c.name.toLowerCase() === query.trim().toLowerCase());

    const select = (c: Company) => {
        onChange({ type: "existing", documentId: c.documentId, name: c.name });
        setQuery(c.name);
        setOpen(false);
    };

    const selectNew = () => {
        const name = query.trim();
        onChange({ type: "new", name });
        setOpen(false);
    };

    // Sync display text when parent resets value
    useEffect(() => {
        if (!value) setQuery("");
    }, [value]);

    return (
        <div className="group flex flex-col gap-1" ref={ref}>
            <label className="text-sm font-semibold uppercase tracking-widest text-primary-blue opacity-70 group-focus-within:opacity-100 transition-opacity duration-200">
                Company
            </label>
            <div className="relative">
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Type to search or add new…"
                    value={query}
                    onFocus={() => setOpen(true)}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    className="w-full bg-transparent border-b-2 border-blue-200 px-0 py-2 text-sm text-primary-blue placeholder:text-secondary-blue/40 focus:outline-none focus:border-primary-blue transition-all duration-300"
                />

                {open && (query.length > 0 || filtered.length > 0) && (
                    <ul className="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-blue-100 shadow-lg max-h-56 overflow-y-auto text-sm font-mono">
                        {filtered.map((c) => (
                            <li
                                key={c.documentId}
                                onMouseDown={() => select(c)}
                                className="px-4 py-2.5 text-primary-blue hover:bg-light-blue cursor-pointer flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary-blue shrink-0" />
                                {c.name}
                            </li>
                        ))}
                        {showAddNew && (
                            <li
                                onMouseDown={selectNew}
                                className="px-4 py-2.5 text-primary-blue hover:bg-light-blue cursor-pointer flex items-center gap-2 border-t border-blue-50"
                            >
                                <span className="text-lg leading-none font-bold">+</span>
                                Add &ldquo;{query.trim()}&rdquo; as new company
                            </li>
                        )}
                        {filtered.length === 0 && !showAddNew && (
                            <li className="px-4 py-2.5 text-secondary-blue/60 italic">
                                Type a company name to add it
                            </li>
                        )}
                    </ul>
                )}
            </div>

            {/* Selected badge */}
            {value && (
                <p className="text-xs text-secondary-blue mt-0.5">
                    {value.type === "existing" ? (
                        <>✓ Existing company selected</>
                    ) : (
                        <>✨ Will create new company &ldquo;{value.name}&rdquo;</>
                    )}
                </p>
            )}

            {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
        </div>
    );
}
