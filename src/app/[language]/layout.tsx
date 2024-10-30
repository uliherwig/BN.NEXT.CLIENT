import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/common/header";
import { LanguageProps } from "@/models/common/language-props";
import { getDictionary } from "../lib/dictionaries/dictionaries";
import SessionProviderWrapper from "@/provider/session-provider-wrapper";
import ToastProvider from "@/components/common/toast-container";
import { getSession } from "next-auth/react";
import { DictionaryProvider } from "@/provider/dictionary-provider";

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
      <head>
        <title>BN PROJECT</title>
      </head>
      <body className="bg-black flex justify-center items-center h-full overflow-hidden">
        <div className=" max-w-[1920px] w-full h-full">
          <SessionProviderWrapper>
            <DictionaryProvider dictionary={dict}>
              <header className="bg-bn-dark">
                <Header dict={dict} />
              </header>
              <main className="h-content bg-slate-100">
                {children}
              </main>
              <footer className="text-xs h-[30px] bg-bn-dark">
                &copy; {new Date().getFullYear()} BN PROJECT
              </footer>
            </DictionaryProvider>
          </SessionProviderWrapper>
        </div> </body>
    </html>
  );
}