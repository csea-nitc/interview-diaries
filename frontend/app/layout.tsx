import { IBM_Plex_Mono, Inter, Epilogue } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-epilogue",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${epilogue.variable}`}>
      <body className="font-sans antialiased m-0 p-0 text-base flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-1 w-full">
          <Sidebar />
          <main className="flex-1 bg-white min-h-[90vh] flex flex-col">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

