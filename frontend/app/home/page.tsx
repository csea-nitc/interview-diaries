export default function AboutPage() {
    return (
        <main className="flex justify-center px-4 sm:px-6 md:p-8 lg:px-0">
            <div className="flex flex-col justify-between w-full max-w-4xl py-8">

                <div>
                    <h1 className="text-center text-[#0430CA] font-[family-name:var(--font-display)] font-[600] text-[32px]">
                        Interview Diaries
                    </h1>

                    <p className="text-[#5872CF] font-[family-name:var(--font-body)] text-base mt-8 leading-relaxed text-center">
                        An initiative by the Computer Science and Engineering Association, Interview Diaries is all about trying to help the novices avoid sweaty palms when they face the interview desk for the first time. Every company in this vast industrial world has its own way of filtering and selecting its candidates for employment. While we cannot pinpoint the exact procedure that each of them follow, what we can do is provide you with the advice sought from the ones who have successfully tackled their tests.
                    </p>

                    <p className="text-[#5872CF] font-[family-name:var(--font-body)] text-base mt-4 leading-relaxed text-center">
                        Our articles will consist of the experiences of the very own students/alumni of NITC who have worked or are presently working in various companies. Most of the companies' pages will include articles from both interns and full-timers, providing an insight into the difference (or similarity) in their procedure accordingly.
                    </p>

                    <p className="text-[#5872CF] font-[family-name:var(--font-body)] text-base mt-4 text-center">
                        We hope you find Interview Diaries helpful. Happy reading and good luck!
                    </p>
                </div>

                <div className="bg-[#EEF9FF] text-[#5872CF] p-6 mt-10 text-center sm:text-left">
                    <p className="font-[700] text-sm">
                        The content in the website is subject to copyright and should not be reproduced in any format without the consent of the authors.
                    </p>

                    <p className="text-sm mt-3 text-center">
                        Feedback can be directed to{" "}
                        <span className="underline underline-offset-4">
                            csea@nitc.ac.in
                        </span>
                    </p>
                </div>

            </div>
        </main>
    );
}