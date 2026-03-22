import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="w-full flex-1 flex flex-col items-center pt-16 px-8 md:px-16 lg:px-24">
            <div className="max-w-5xl w-full flex flex-col mb-8">
                <h1 className="text-4xl font-semibold font-display text-primary-blue mb-8 tracking-wide">
                    Interview Diaries
                </h1>

                <div className="text-base leading-relaxed text-secondary-blue  space-y-6 text-center lg:text-left">
                    <p>
                        An initiative by the Computer Science and Engineering Association, Interview
                        Diaries is all about trying to help the novices avoid sweaty palms when they
                        face the interview desk for the first time. Every company in this vast industrial
                        world has its own way of filtering and selecting its candidates for employment.
                        While we cannot pinpoint the exact procedure that each of them follow, what
                        we can do is provide you with the advice sought from the ones who have
                        successfully tackled their tests.
                    </p>

                    <p>
                        Our articles will consist of the experiences of the very own students/alumni of
                        NITC who have worked or are presently working in various companies. Most of
                        the companies' pages will include articles from both interns and full-timers,
                        providing an insight into the difference (or similarity) in their procedure
                        accordingly.
                    </p>

                    <p>
                        We hope you find Interview Diaries helpful. Happy reading and good luck!
                    </p>
                </div>
            </div>

            <div className="max-w-5xl w-full   flex flex-col mt-5 mb-16 font-sans">
                <p className="text-secondary-blue font-bold text-base leading-relaxed max-w-4xl mb-4">
                    The content in the website is subject to copyright and should not be
                    reproduced in any format without the consent of the authors.
                </p>
                <p className="text-secondary-blue text-base">
                    Feedback can be directed to <a href="mailto:csea@nitc.ac.in" className="underline hover:text-primary-blue transition">csea@nitc.ac.in</a>
                </p>
            </div>
        </div>
    );
}
