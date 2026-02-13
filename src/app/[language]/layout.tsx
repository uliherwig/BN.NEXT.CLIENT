import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });
import Header from "@/app/components/header";
import { LanguageProps } from "@/app/models/common/language-props";
import { getDictionary } from "../lib/dictionaries/dictionary";
import SessionProviderWrapper from "@/app/provider/session-provider-wrapper";
import { DictionaryProvider } from "@/app/provider/dictionary-provider";
import CookieConsent from "@/app/components/common/cookie-consent";
import Footer from "@/app/components/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { SignalRProvider } from "@/app/provider/signalr-provider";

// prerender static pages for each language
export async function generateStaticParams() {
  return [{ language: 'en' }, { language: 'de' }]
}

export default async function RootLayout({ children, params }: {
  children: React.ReactNode; params: LanguageProps["params"];
}) {

  const dict = getDictionary(params.language)
  const session = await getServerSession(authOptions);

  return (
    <html lang={params.language}>
      <head>
        <title>{dict.HOME_title}</title>
      </head>
      <body className="bg-black flex justify-center items-center h-full overflow-hidden">
        <div className=" max-w-[1920px] w-full h-full">
          <DictionaryProvider dictionary={dict}>
            <SessionProviderWrapper session={session}>

              <header className="bg-bn-dark">
                <Header dict={dict} language={params.language} />
              </header>
              <SignalRProvider >
                <main className="h-content bg-slate-100">
                  {children}
                </main>
              </SignalRProvider>
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