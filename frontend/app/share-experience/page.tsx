"use client";

import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { CompanyCombobox, type CompanySelection } from "@/components/ui/CompanyCombobox";
import { useAuth } from "@/lib/useAuth";
import { strapiRequest } from "@/lib/strapiRequest";

// ── Validation schema ────────────────────────────────────────────────────────

const currentYear = new Date().getFullYear();

const roundSchema = z.object({
    heading: z.string().min(1, "Round name is required"),
    body: z.string().optional(),
});

const formSchema = z.object({
    candidateName: z.string().min(2, "Name must be at least 2 characters"),
    roleType: z.enum(["Full Time", "Internship"] as const, {
        message: "Select Full Time or Internship",
    }),
    jobTitle: z.string().min(2, "Role / job title is required"),
    year: z
        .number({ error: "Year must be a number" })
        .int("Year must be a whole number")
        .min(2000, "Year must be 2000 or later")
        .max(currentYear, `Year cannot be after ${currentYear}`),
    stipend: z.string().optional(),
    totalRounds: z
        .number({ error: "Enter number of rounds" })
        .int()
        .min(1, "Must have at least 1 round"),
    roundsOverview: z.string().optional(),
    rounds: z.array(roundSchema).min(1, "Add at least one round"),
});

type FormErrors = Partial<Record<string, string>>;
type Section = { heading: string; body: string };

// ── Component ────────────────────────────────────────────────────────────────

export default function ShareExperiencePage() {
    useAuth();
    const [sections, setSections] = useState<Section[]>([
        { heading: "", body: "" },
        { heading: "", body: "" },
    ]);
    const [company, setCompany] = useState<CompanySelection | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");

    const [form, setForm] = useState({
        candidateName: "",
        roleType: "Full Time" as "Full Time" | "Internship",
        jobTitle: "",
        year: "",
        stipend: "",
        ctc: "",
        isPPO: false,
        totalRounds: "",
        roundsOverview: "",
    });

    const set = (field: string, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const addSection = () =>
        setSections((prev) => [...prev, { heading: "", body: "" }]);

    const updateSection = (idx: number, key: keyof Section, value: string) => {
        setSections((prev) => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], [key]: value };
            return copy;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError("");

        // Company validation
        const newErrors: FormErrors = {};
        if (!company) newErrors["company"] = "Please select or add a company";

        const parsed = formSchema.safeParse({
            candidateName: form.candidateName,
            roleType: form.roleType,
            jobTitle: form.jobTitle,
            year: form.year ? parseInt(form.year, 10) : undefined,
            stipend: form.stipend || undefined,
            totalRounds: form.totalRounds ? parseInt(form.totalRounds, 10) : undefined,
            roundsOverview: form.roundsOverview || undefined,
            rounds: sections,
        });

        if (!parsed.success) {
            for (const issue of parsed.error.issues) {
                const key = issue.path.join(".");
                if (!newErrors[key]) newErrors[key] = issue.message;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSubmitting(true);

        try {
            const body: Record<string, unknown> = {
                candidateName: parsed.data!.candidateName,
                roleType: parsed.data!.roleType,
                jobTitle: parsed.data!.jobTitle,
                year: parsed.data!.year,
                stipend: parsed.data!.stipend,
                ctc: form.ctc ? parseInt(form.ctc, 10) : undefined,
                isPPO: form.roleType === "Full Time" ? form.isPPO : false,
                totalRounds: parsed.data!.totalRounds,
                tips: parsed.data!.roundsOverview,
                rounds: sections.map((s) => ({
                    name: s.heading,
                    descriptions: s.body,
                })),
            };

            if (company!.type === "existing") {
                body.company = company!.documentId;
            } else {
                body.newCompanyName = company!.name;
            }

            const res = await strapiRequest("/api/submissions", {
                method: "POST",
                body: JSON.stringify({ data: body }),
            });

            if (!res.ok) {
                const json = await res.json();
                setServerError(json?.error?.message || "Submission failed. Please try again.");
                return;
            }

            setSubmitted(true);
        } catch {
            setServerError("Could not reach the server. Check your connection and try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // ── Success state ────────────────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="w-full flex-1 flex flex-col items-center pt-16 px-8 md:px-16 lg:px-24 font-mono">
                <div className="max-w-5xl w-full">
                    <div className="border-l-4 border-primary-blue pl-6 py-2 mb-6">
                        <h1 className="text-4xl font-bold text-primary-blue mb-3 tracking-wide">
                            Thank you!
                        </h1>
                        <p className="text-base leading-relaxed text-secondary-blue max-w-lg">
                            Your experience has been submitted for review. It will appear on the
                            site once an admin approves it.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setCompany(null);
                            setForm({
                                candidateName: "", roleType: "Full Time",
                                jobTitle: "", year: "", stipend: "", ctc: "", isPPO: false, totalRounds: "", roundsOverview: "",
                            });
                            setSections([{ heading: "", body: "" }, { heading: "", body: "" }]);
                        }}
                        className="text-sm text-primary-blue border-b-2 border-dashed border-primary-blue/30 pb-0.5 hover:border-primary-blue transition-all"
                    >
                        Submit another experience
                    </button>
                </div>
            </div>
        );
    }

    // ── Form ─────────────────────────────────────────────────────────────────
    return (
        <div className="w-full flex-1 flex flex-col items-center pt-16 px-8 md:px-16 lg:px-24 font-mono">
            <div className="max-w-5xl w-full flex flex-col mb-16">

                <h1 className="text-4xl font-bold font-mono text-primary-blue mb-4 tracking-wide">
                    Share your experience
                </h1>
                <p className="text-base leading-relaxed text-secondary-blue mb-12 max-w-2xl">
                    Contribute to popular belief. Share your interview experience to help
                    others prepare better.
                </p>

                <div className="border-t border-blue-100 mb-12" />

                <form onSubmit={handleSubmit} noValidate className="space-y-10">

                    {/* Personal info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="sm:col-span-2">
                            <FieldWrap error={errors["candidateName"]}>
                                <Input
                                    label="Name"
                                    placeholder="Ex: John Doe"
                                    value={form.candidateName}
                                    onChange={(e) => set("candidateName", e.target.value)}
                                />
                            </FieldWrap>
                        </div>

                        {/* Searchable company combobox — spans full row */}
                        <div className="sm:col-span-2">
                            <CompanyCombobox
                                value={company}
                                onChange={setCompany}
                                error={errors["company"]}
                            />
                        </div>

                        <FieldWrap error={errors["roleType"]}>
                            <Select
                                label="Type"
                                options={["Full Time", "Internship"]}
                                value={form.roleType}
                                onChange={(e) => set("roleType", e.target.value)}
                            />
                        </FieldWrap>

                        <FieldWrap error={errors["jobTitle"]}>
                            <Input
                                label="Role / Job Title"
                                placeholder="Ex: Systems Architect"
                                value={form.jobTitle}
                                onChange={(e) => set("jobTitle", e.target.value)}
                            />
                        </FieldWrap>

                        <FieldWrap error={errors["year"]}>
                            <Input
                                label="Year"
                                type="number"
                                placeholder={`Ex: ${currentYear}`}
                                value={form.year}
                                onChange={(e) => set("year", e.target.value)}
                            />
                        </FieldWrap>

                        <FieldWrap error={errors["stipend"]}>
                            <Input
                                label="Stipend / Package (optional)"
                                placeholder="Ex: ₹1,70,000 / month"
                                value={form.stipend}
                                onChange={(e) => set("stipend", e.target.value)}
                            />
                        </FieldWrap>

                        {form.roleType === "Full Time" && (
                            <>
                                <FieldWrap error={errors["ctc"]}>
                                    <Input
                                        label="CTC in ₹ (optional)"
                                        type="number"
                                        placeholder="Ex: 3410000"
                                        value={form.ctc}
                                        onChange={(e) => set("ctc", e.target.value)}
                                    />
                                </FieldWrap>
                                <div className="flex items-center sm:pt-6 pt-2">
                                    <label className="flex items-center gap-2 text-sm text-primary-blue cursor-pointer focus-within:ring-2 focus-within:ring-primary-blue rounded">
                                        <input
                                            type="checkbox"
                                            checked={form.isPPO}
                                            onChange={(e) => setForm((prev) => ({ ...prev, isPPO: e.target.checked }))}
                                            className="w-4 h-4 text-primary-blue border-blue-200 focus:ring-primary-blue accent-primary-blue"
                                        />
                                        Is this a Pre-Placement Offer (PPO)?
                                    </label>
                                </div>
                            </>
                        )}

                        <FieldWrap error={errors["totalRounds"]}>
                            <Input
                                label="Number of Rounds"
                                type="number"
                                placeholder="Ex: 4"
                                value={form.totalRounds}
                                onChange={(e) => set("totalRounds", e.target.value)}
                            />
                        </FieldWrap>
                    </div>

                    <FieldWrap error={errors["roundsOverview"]}>
                        <Textarea
                            label="Rounds Overview (optional)"
                            placeholder={`Ex:\nNumber of rounds - 4\nTest Rounds - 1\nInterview Rounds - 3`}
                            value={form.roundsOverview}
                            onChange={(e) => set("roundsOverview", e.target.value)}
                        />
                    </FieldWrap>

                    {errors["rounds"] && (
                        <p className="text-red-500 text-xs">{errors["rounds"]}</p>
                    )}

                    {sections.map((section, idx) => (
                        <div key={idx} className="pt-8 border-t border-blue-100">
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-blue mb-6">
                                Round {idx + 1}
                            </h2>
                            <div className="space-y-10">
                                <FieldWrap error={errors[`rounds.${idx}.heading`]}>
                                    <Input
                                        label="Round Name"
                                        placeholder="Ex: Round 1 (Online Test)"
                                        value={section.heading}
                                        onChange={(e) => updateSection(idx, "heading", e.target.value)}
                                    />
                                </FieldWrap>
                                <Textarea
                                    label="Description (optional)"
                                    placeholder={`Ex:\n1 coding question\n3 technical MCQs`}
                                    value={section.body}
                                    onChange={(e) => updateSection(idx, "body", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSection}
                        className="flex items-center gap-2 text-sm font-medium text-primary-blue border-b-2 border-dashed border-primary-blue/30 pb-0.5 hover:border-primary-blue transition-all duration-200"
                    >
                        <span className="text-xl leading-none">+</span>
                        <span>Add round</span>
                    </button>

                    {serverError && (
                        <p className="text-red-500 text-sm">{serverError}</p>
                    )}

                    <div className="border-t border-blue-100 pt-6">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-primary-blue text-white px-10 py-2.5 text-sm font-bold tracking-widest uppercase hover:bg-blue-800 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Submitting…" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function FieldWrap({ children, error }: { children: React.ReactNode; error?: string }) {
    return (
        <div className="flex flex-col gap-1">
            {children}
            {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
        </div>
    );
}
