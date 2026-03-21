"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    // 🔥 OPEN animation
    useEffect(() => {
        if (isMobileMenuOpen && menuRef.current) {
            gsap.fromTo(
                menuRef.current,
                { y: "-100%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                }
            );

            // optional stagger
            gsap.from(".menu-item", {
                y: 20,
                opacity: 0,
                stagger: 0.08,
                delay: 0.2,
                duration: 0.4,
                ease: "power3.out",
            });
        }
    }, [isMobileMenuOpen]);

    // 🔥 CLOSE animation
    const closeMenu = (callback?: () => void) => {
        if (!menuRef.current) return;

        gsap.to(menuRef.current, {
            y: "-100%",
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => {
                setIsMobileMenuOpen(false);
                callback && callback();
            },
        });
    };

    // 🔥 Navigation handler (animation + scroll + route)
    const handleNavigate = (path: string) => {
        closeMenu(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });

            setTimeout(() => {
                router.push(path);
            }, 300); // slight delay for smoothness
        });
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="h-[72px] w-full border-b border-blue-100 flex items-center justify-between px-6 bg-white shrink-0 relative z-40">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 border border-blue-500 overflow-hidden text-blue-600 text-[10px] font-bold text-center leading-none">
                        CSEA<br />LOGO
                    </div>
                    <div className="flex flex-col">
                        <span className="text-primary-blue hidden md:block font-bold text-[11px] sm:text-xs tracking-wide leading-tight font-mono">
                            COMPUTER SCIENCE &<br />
                            ENGINEERING ASSOC.<br />
                            NIT CALICUT
                        </span>
                    </div>
                </div>

                <div className="hidden md:block text-2xl tracking-wide font-mono">
                    <span className="font-bold text-primary-blue">INTERVIEW</span>
                    <span className="text-secondary-blue ml-2">DIARIES</span>
                </div>

                {/* MOBILE */}
                <div className="flex md:hidden items-center gap-2 sm:gap-4">
                    <div className="text-sm tracking-wide font-mono leading-none flex items-center">
                        <span className="font-bold text-primary-blue">INTERVIEW</span>
                        <span className="text-secondary-blue ml-1">DIARIES</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu className="w-7 h-7 text-primary-blue" />
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {isMobileMenuOpen && (
                <div
                    ref={menuRef}
                    className="fixed inset-0 z-50 flex flex-col font-mono bg-white overflow-hidden"
                >
                    {/* HEADER */}
                    <div className="h-[72px] w-full flex items-center justify-between px-6 shrink-0 border-b border-blue-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 border border-blue-500 overflow-hidden text-blue-600 text-[10px] font-bold text-center leading-none">
                                CSEA<br />LOGO
                            </div>
                            <div className="flex flex-col">
                                <span className="text-primary-blue font-bold text-[11px] sm:text-xs tracking-wide leading-tight font-mono">
                                    COMPUTER SCI. &<br />
                                    ENGINEERING ASSOC.<br />
                                    NIT CALICUT
                                </span>
                            </div>
                        </div>

                        <button onClick={() => closeMenu()}>
                            <X className="w-8 h-8 text-primary-blue" />
                        </button>
                    </div>

                    {/* MENU ITEMS */}
                    <div className="flex flex-col w-full mt-2">

                        <div className="menu-item px-8 py-5 text-lg font-semibold text-primary-blue border-b border-blue-100">
                            ABOUT
                        </div>

                        <div
                            className="menu-item px-8 py-5 text-lg font-semibold text-primary-blue border-b border-blue-100 cursor-pointer flex items-center gap-2"
                            onClick={() => handleNavigate("/companies")}
                        >
                            <span className="text-[10px]">▶</span> COMPANIES
                        </div>

                        <div
                            className="menu-item px-8 py-5 text-lg font-semibold text-primary-blue cursor-pointer"
                            onClick={() => handleNavigate("/share-experience")}
                        >
                            SHARE YOUR EXPERIENCE
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}