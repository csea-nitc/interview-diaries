import React from "react";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="w-full flex-1 flex flex-col items-center justify-center font-mono min-h-[calc(100vh-200px)]">
            <div className="flex flex-col items-center text-center max-w-sm px-6">
                <img src="/logo-nav.svg" alt="CSEA Logo" className="h-16 w-auto mb-8 opacity-90" />
                
                <h1 className="text-2xl font-bold text-primary-blue mb-4 tracking-wide">
                    Authentication Required
                </h1>
                
                <p className="text-secondary-blue mb-10 leading-relaxed text-sm">
                    Access to company statistics and interview experiences is exclusively restricted to NITC students. Please sign in with your institute email.
                </p>

                <a 
                    href="http://localhost:1337/api/connect/google" 
                    className="flex flex-row items-center justify-center gap-3 text-sm font-bold font-mono text-white bg-primary-blue px-8 py-4 hover:bg-blue-800 transition uppercase w-full shadow-sm hover:shadow-md"
                >
                    <LogIn className="w-5 h-5" /> 
                    Sign in with Google
                </a>

                <Link href="/" className="mt-8 text-xs text-secondary-blue/70 underline hover:text-primary-blue transition">
                    Return to home
                </Link>
            </div>
        </div>
    );
}
