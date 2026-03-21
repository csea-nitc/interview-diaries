import React from "react";
import Link from "next/link";
import { Linkedin, Instagram, Github, Facebook } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-primary-blue text-white px-12 py-12 shrink-0 flex flex-col md:flex-row justify-between items-start font-mono">
            {/* Left */}
            <div className="flex flex-col mb-8 md:mb-0">
                <h1 className="text-5xl md:text-6xl font-black tracking-widest leading-[0.9]">
                    INTERVIEW<br />DIARIES
                </h1>
            </div>

            {/* Middle */}
            <div className="flex flex-col items-center md:items-start max-w-sm mb-8 md:mb-0">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 border border-white/50 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-[8px] font-bold text-center">CSEA<br />LOGO</span>
                    </div>
                    <span className="text-sm font-semibold tracking-wide">
                        COMPUTER SCI. &<br />
                        ENGINEERING ASSOC.<br />
                        NIT CALICUT
                    </span>
                </div>

                <div className="flex items-center gap-6 text-white ml-2 md:ml-18">
                    <a href="#" className="hover:text-gray-200 transition"><Linkedin className="w-6 h-6" /></a>
                    <a href="#" className="hover:text-gray-200 transition"><Instagram className="w-6 h-6" /></a>
                    <a href="#" className="hover:text-gray-200 transition"><Github className="w-6 h-6" /></a>
                    <a href="#" className="hover:text-gray-200 transition"><Facebook className="w-6 h-6" /></a>
                </div>
            </div>

            {/* Right */}
            <div className="flex flex-col md:w-64">
                <h3 className="text-xl font-bold mb-4 font-mono tracking-wide">Quick Links</h3>
                <ul className="space-y-4 text-base font-mono">
                    <li><Link href="/" className="hover:underline">CSEA</Link></li>
                    <li><Link href="/" className="hover:underline">Minerva</Link></li>
                    <li><Link href="/" className="hover:underline">NIT Calicut</Link></li>
                </ul>
            </div>
        </footer>
    );
}
