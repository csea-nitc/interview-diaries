export default function InterviewDiariesPage() {
    return (
        <main className="h-screen w-screen flex overflow-hidden bg-[#f7f8fb]">
            {/* MAIN CONTENT – FULL SCREEN */}
            <section className="flex-1 h-full mx-auto overflow-y-auto bg-white px-12 py-10">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex gap-6">
                        <span className="inline-block text-sm font-semibold text-white bg-blue-800 px-3 py-[0.08rem]  mb-3">
                            &#x25B6;
                            Gautham Sunil
                        </span>
                        <div className="text-sm text-blue-800 font-semibold">
                            2025 | ISSUE 6 | ARTICLE 5
                        </div>

                    </div>

                    <h1 className="text-3xl font-semibold text-blue-800">
                        Application Development Engineer
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Experience · 2025 · 3 Interview Rounds
                    </p>
                    <div className="mt-10 border-t border-2  border-blue-500">

                    </div>
                </header>
                <div className="w-full max-w-screen-xl mx-auto md:px-[3vw] lg:px-[15vw]">

                    {/* Stipend */}

                    <div className="max-w-4xl bg-blue-50 border border-blue-100 px-5 py-3 mb-8">
                        <p className="text-lg md:text-xl text-blue-800">
                            <span className="font-semibold">Stipend:</span> CTC-34.1LPA, Base 12,77,000
                        </p>
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-1  gap-6 mb-10 text-lg">
                        <div>
                            <p className="text-blue-600">Total Rounds= 4</p>

                        </div>
                        <div>
                            <p className="text-blue-600">Written Tests= 1</p>
                        </div>
                        <div>
                            <p className="text-blue-600">Interviews= 3</p>

                        </div>
                    </div>

                    {/* Rounds */}
                    <div className="space-y-10 text-sm text-gray-700">
                        <section>
                            <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-3">
                                Round 1 (Online Test)
                            </h2>
                            <ul className="list-disc text-lg text-blue-700 pl-6 space-y-1">
                                <li>Coding (Arrays, Strings)</li>
                                <li>DBMS, OS, CN, Web basics</li>
                                <li>15 Aptitude MCQs</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-3">
                                Round 2 (Interview 1)
                            </h2>
                            <ul className="list-disc text-lg text-blue-700 pl-6 space-y-1">
                                <li>Resume discussion</li>
                                <li>OOPS + examples</li>
                                <li>SQL and normalization</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-3">
                                Round 3 (Interview 2)
                            </h2>
                            <p className="text-blue-700 text-lg">
                                Deep dive into projects, design decisions, tradeoffs, and edge
                                cases.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-3">
                                Round 4 (Interview 3)
                            </h2>
                            <ul className="list-disc text-lg text-blue-700 pl-6 space-y-1">
                                <li>System design fundamentals</li>
                                <li>Scaling discussions</li>
                                <li>Backend tradeoffs</li>
                            </ul>
                        </section>
                    </div>

                    {/* Tips */}
                    <section className="pt-6">
                        <h3 className="font-semibold text-xl md:text-2xl text-blue-800 mb-2">Tips:</h3>
                        <p className="text-lg text-blue-600">
                            Know your fundamentals and explain *why* you made design choices —
                            not just *what* you built.
                        </p>
                    </section>

                    {/* Resources */}
                    <section >
                        <h3 className="mt-6 font-semibold text-xl md:text-2xl text-blue-800">Resources:</h3>
                        <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">
                            GeeksforGeeks – Interview Preparation
                        </a>
                    </section>
                </div>
            </section>
        </main>
    );
}
