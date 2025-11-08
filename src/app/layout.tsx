import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AppProviders from "./providers";
import { Header } from "@/marketing/header";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { User } from "firebase/auth";

export const dynamic = "force-dynamic";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Career Compass - Your Personal Career Guide",
  description:
    "A comprehensive career guidance platform that helps students and professionals explore careers, build resumes, practice interviews, and track their development journey.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} min-h-dvh antialiased flex flex-col`}
      >
        <AppProviders>
          <Header initialUser={currentUser?.toJSON() as User | null} />
          <main className="flex-1">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
