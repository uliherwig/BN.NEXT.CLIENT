import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/header";
import { LanguageProps } from "@/models/common/LanguageProps";
import { getDictionary } from "../lib/dictionaries/dictionaries";
import SessionProviderWrapper from "@/components/session-provider-wrapper";
import ToastProvider from "@/components/common/toast-container";
import { getSession } from "next-auth/react";

// prerender static pages for each language
export async function generateStaticParams() {
  return [{ language: 'en' }, { language: 'de' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LanguageProps["params"];
}) {
  const dict = await getDictionary(params.language)

  return (
    <html lang={params.language}>
      <body className="flex justify-center items-center min-h-screen overflow-hidden">
        <div className="flex flex-col bg-slate-100 w-full max-w-[1920px]">
          <SessionProviderWrapper>
            <header className="h-[40px] bg-slate-800 p-1 px-5 text-white">
              <Header dict={dict} />
            </header>
            <main className="content-container">
              {children}
            </main>
            <footer className="h-[30px] bg-slate-800 text-white p-2 text-xs">
              &copy; {new Date().getFullYear()} BN PROJECT
            </footer>
          </SessionProviderWrapper>
        </div>
      </body>
    </html>
  );
}