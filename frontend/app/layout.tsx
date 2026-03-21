import { IBM_Plex_Mono, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let companies = [];
  try {
    const res = await fetch("http://localhost:1337/api/companies", { next: { revalidate: 60 } });
    const json = await res.json();
    if (json?.data) {
      companies = json.data;
    }
  } catch (err) {
    console.error("Failed to fetch sidebar companies", err);
  }

  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="font-sans antialiased m-0 p-0 text-base flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-1 w-full">
          <Sidebar companies={companies} />
          <main className="flex-1 bg-white min-h-screen flex flex-col">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
