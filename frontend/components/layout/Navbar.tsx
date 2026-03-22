"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("strapi_jwt");
        if (!token) return;
        fetch("http://localhost:1337/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.ok ? r.json() : null)
            .then((data) => { if (data?.email) setUserEmail(data.email); })
            .catch(() => { });
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("strapi_jwt");
        setUserEmail(null);
        window.dispatchEvent(new Event("auth:logout"));
        router.push("/");
    };

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
                    <img src="/logo-nav.svg" alt="CSEA Logo" className="h-10 w-auto" />
                </div>

                <div className="hidden md:block text-2xl tracking-wide font-mono">
                    <span className="font-semibold text-primary-blue">INTERVIEW</span>
                    <span className="text-secondary-blue ml-2">DIARIES</span>
                </div>

                {/* DESKTOP: Auth button */}
                <div className="hidden md:flex items-center">
                    {userEmail ? (
                        <div className="flex items-center gap-3">
                            <button onClick={handleSignOut} className="flex items-center gap-1.5 text-sm font-bold font-mono text-primary-blue border border-primary-blue px-3 py-1.5 hover:bg-blue-50 transition uppercase">
                                <LogOut className="w-3.5 h-3.5" /> Sign Out
                            </button>
                        </div>
                    ) : (
                        <a href="/login" className="flex items-center gap-1.5 text-sm font-bold font-mono text-white bg-primary-blue px-4 py-1.5 hover:bg-blue-800 transition uppercase">
                            <LogIn className="w-3.5 h-3.5" /> Sign In
                        </a>
                    )}
                </div>

                {/* MOBILE */}
                <div className="flex md:hidden items-center gap-2 sm:gap-4">
                    <div className="text-sm tracking-wide font-mono leading-none flex flex-col sm:flex-row text-right sm:items-center">
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
                            <img src="/logo-nav.svg" alt="CSEA Logo" className="h-10 w-auto" />
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

                        {/* Auth in mobile menu */}
                        <div className="px-8 py-5 border-t border-blue-100 mt-2">
                            {userEmail ? (
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-secondary-blue font-mono">{userEmail}</span>
                                    <button onClick={handleSignOut} className="flex items-center gap-2 text-sm font-bold text-red-500 uppercase">
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            ) : (
                                <a href="http://localhost:1337/api/connect/google" className="flex items-center gap-2 text-sm font-bold text-primary-blue uppercase">
                                    <LogIn className="w-4 h-4" /> Sign In with NITC Google
                                </a>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}