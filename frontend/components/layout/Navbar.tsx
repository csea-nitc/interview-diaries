import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
    return (
        <nav className="h-[72px] w-full border-b border-blue-100 flex items-center justify-between px-6 bg-white shrink-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 border border-blue-500 overflow-hidden text-blue-600 text-[10px] font-bold text-center leading-none">
                    CSEA<br />LOGO
                </div>
                <div className="flex flex-col">
                    <span className="text-primary-blue font-bold text-xs tracking-wide leading-tight font-mono">
                        COMPUTER SCI. &<br />
                        ENGINEERING ASSOC.<br />
                        NIT CALICUT
                    </span>
                </div>
            </div>

            <div className="text-2xl tracking-wide font-mono">
                <span className="font-bold text-primary-blue">INTERVIEW</span>
                <span className="text-secondary-blue ml-2">DIARIES</span>
            </div>
        </nav>
    );
}
