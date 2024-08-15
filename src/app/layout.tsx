import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Header from "@/components/Header";

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body>
          <div className="flex flex-col  bg-violet-950">

            <header className="h-[40px] bg-slate-800 p-1 px-5 text-white">
              <Header />
            </header>

            <main>
               {children}
            </main>        

            <footer className="h-[30px] bg-slate-800 text-white p-2 text-xs">
              &copy; {new Date().getFullYear()} BN TRADING APP
            </footer>

          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}