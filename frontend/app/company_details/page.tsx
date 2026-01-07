export default function InterviewDiariesPage() {
    return (
        <main className="min-h-screen w-full flex bg-[#f7f8fb]">
            <section
                className="
          flex-1 overflow-y-auto bg-white
          px-4 sm:px-6 md:px-10 lg:px-12
          py-6 sm:py-8 md:py-10
        "
            >
                {/* HEADER */}
                <header className="mb-8 flex flex-col gap-3">

                    {/* NAME */}
                    <span
                        className="
              order-2 md:order-1
              inline-flex items-center justify-center md:justify-start
              text-xs sm:text-sm font-semibold text-white
              bg-blue-800 px-3 py-[0.1rem]
              w-fit mx-auto md:mx-0
            "
                    >
                        ▶ Gautham Sunil
                    </span>

                    {/* META */}
                    <div
                        className="
              order-3 md:order-2
              text-xs sm:text-sm font-semibold text-blue-800
              text-center md:text-left
            "
                    >
                        2025 | ISSUE 6 | ARTICLE 5
                    </div>

                    {/* JOB TITLE */}
                    <h1
                        className="
              order-1 md:order-3
              text-xl sm:text-2xl md:text-3xl
              font-semibold text-blue-800
              text-center md:text-left
            "
                    >
                        Application Development Engineer
                    </h1>

                    {/* EXPERIENCE */}
                    <p
                        className="
              order-4
              text-xs sm:text-sm text-gray-500
              text-center md:text-left
            "
                    >
                        Experience · 2025 · 3 Interview Rounds
                    </p>

                    {/* DIVIDER */}

                </header>
                <div className="pt-10 border-t-2 border-blue-500" />
                {/* CONTENT */}
                <div
                    className="
            w-full max-w-5xl mx-auto
            text-sm sm:text-base md:text-lg
            leading-relaxed
          "
                >
                    {/* STIPEND */}
                    <div className="bg-blue-50 border border-blue-100 px-4 sm:px-5 py-3 mb-8 rounded-sm">
                        <p className="text-blue-800">
                            <span className="font-semibold">Stipend:</span> CTC-34.1 LPA, Base 12,77,000
                        </p>
                    </div>

                    {/* META GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 text-blue-600">
                        <p>Total Rounds = 4</p>
                        <p>Written Tests = 1</p>
                        <p>Interviews = 3</p>
                    </div>

                    {/* ROUNDS */}
                    <div className="space-y-8 sm:space-y-10 text-gray-700">
                        <section>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-800 mb-2">
                                Round 1 (Online Test)
                            </h2>
                            <ul className="list-disc pl-5 text-blue-700 space-y-1">
                                <li>Coding (Arrays, Strings)</li>
                                <li>DBMS, OS, CN, Web basics</li>
                                <li>15 Aptitude MCQs</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-800 mb-2">
                                Round 2 (Interview 1)
                            </h2>
                            <ul className="list-disc pl-5 text-blue-700 space-y-1">
                                <li>Resume discussion</li>
                                <li>OOPS + examples</li>
                                <li>SQL and normalization</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-800 mb-2">
                                Round 3 (Interview 2)
                            </h2>
                            <p className="text-blue-700">
                                Deep dive into projects, design decisions, tradeoffs, and edge cases.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-800 mb-2">
                                Round 4 (Interview 3)
                            </h2>
                            <ul className="list-disc pl-5 text-blue-700 space-y-1">
                                <li>System design fundamentals</li>
                                <li>Scaling discussions</li>
                                <li>Backend tradeoffs</li>
                            </ul>
                        </section>
                    </div>

                    {/* TIPS */}
                    <section className="pt-8">
                        <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-blue-800 mb-2">
                            Tips
                        </h3>
                        <p className="text-blue-600">
                            Know your fundamentals and explain <em>why</em> you made design choices —
                            not just <em>what</em> you built.
                        </p>
                    </section>

                    {/* RESOURCES */}
                    <section className="pt-6">
                        <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-blue-800 mb-1">
                            Resources
                        </h3>
                        <a
                            href="https://www.geeksforgeeks.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            GeeksforGeeks – Interview Preparation
                        </a>
                    </section>
                </div>
            </section>
        </main>
    );
}
