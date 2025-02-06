import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/header";
import { LanguageProps } from "@/models/common/language-props";
import { getDictionary } from "../lib/dictionaries/dictionary";
import SessionProviderWrapper from "@/provider/session-provider-wrapper";
import { DictionaryProvider } from "@/provider/dictionary-provider";
import CookieConsent from "@/components/common/cookie-consent";
import Footer from "@/components/footer";

// prerender static pages for each language
export async function generateStaticParams() {
  return [{ language: 'en' }, { language: 'de' }]
}

export default async function RootLayout({ children, params }: {
  children: React.ReactNode; params: LanguageProps["params"];
}) {

  const dict = getDictionary(params.language)

  return (
    <html lang={params.language}>
      <head>
        <title>{dict.HOME_title}</title>
      </head>
      <body className="bg-black flex justify-center items-center h-full overflow-hidden">
        <div className=" max-w-[1920px] w-full h-full">
          <DictionaryProvider dictionary={dict}>
            <SessionProviderWrapper>
              <header className="bg-bn-dark">
                <Header dict={dict} language={params.language} />
              </header>
              <main className="h-content bg-slate-100">
                {children}
              </main>
              <footer className="bg-slate-700 h-[30px] text-white px-4">
                <Footer dict={dict} language={params.language} />
              </footer>
              <CookieConsent />
            </SessionProviderWrapper>
          </DictionaryProvider>
        </div>
      </body>
    </html>
  );
}