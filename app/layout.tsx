import type { Metadata } from "next";
import { Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const pixelFont = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptDrop — Share a prompt. See what your friends become.",
  description: "Create shareable AI prompt links. Friends click, run their AI, and compare results on a shared wall.",
  openGraph: {
    title: "PromptDrop",
    description: "Share a prompt. See what your friends become.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} ${pixelFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
