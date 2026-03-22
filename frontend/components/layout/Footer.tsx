import React from "react";
import Link from "next/link";
import { Linkedin, Instagram, Github, Facebook } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-primary-blue text-white px-6 py-8 md:px-12 md:py-6 shrink-0 flex flex-col md:flex-row justify-between items-center md:items-start font-mono gap-10 md:gap-0">
            {/* 1. Header */}
            <div className="flex flex-col order-1 md:order-1 items-center md:items-start w-full md:w-auto text-center md:text-left">
                <h1 className="text-5xl sm:text-5xl font-thin lg:text-6xl ">
                    <span className="font-semibold">INTERVIEW</span><br />DIARIES
                </h1>
            </div>

            {/* 3. Middle (Logo and Socials) -> Needs to be order 3 on mobile */}
            <div className="flex flex-col items-center md:items-start max-w-sm order-3 md:order-2 w-full md:w-auto">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                    <img src="/csea_logo.png" alt="CSEA Logo" className="h-15" />
                </div>

                <div className="flex items-center justify-center md:justify-start gap-6 text-white w-full">
                    <a href="#" className="hover:text-gray-200 transition"><Linkedin className="w-6 h-6" /></a>
                    <a href="#" className="hover:text-gray-200 transition"><Instagram className="w-6 h-6" /></a>
                    <a href="#" className="hover:text-gray-200 transition"><Github className="w-6 h-6" /></a>
                    <a href="#" className="hover:text-gray-200 transition"><Facebook className="w-6 h-6" /></a>
                </div>
            </div>

            {/* 2. Right (Quick Links) -> Needs to be order 2 on mobile */}
            <div className="flex flex-col order-2 md:order-3 w-full md:w-64 text-center md:text-left">
                <h3 className="text-xl font-bold mb-4 font-mono tracking-wide">Quick Links</h3>
                <ul className="space-y-1 text-xs  font-mono">
                    <li><Link href="/" className="hover:underline">CSEA</Link></li>
                    <li><Link href="/" className="hover:underline">Minerva</Link></li>
                    <li><Link href="/" className="hover:underline">NIT Calicut</Link></li>
                </ul>
            </div>
        </footer>
    );
}
