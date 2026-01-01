import { Geist, Geist_Mono, Epilogue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${epilogue.variable} font-[family-name:var(--font-epilogue)]`}
        style={{ fontSize: "40px" }}
      >
        

        {children}
      </body>

    </html>
  );
}
