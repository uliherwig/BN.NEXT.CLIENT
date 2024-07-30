import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
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

  console.log(locale, messages);

  return (
    <html lang={locale}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <header className="bg-indigo-900 p-1 px-5 text-white">
            <Header />
          </header>

          <div className="flex flex-1">
            <Navigation />
            <main className="flex-1 p-4 bg-white">
              {children}
            </main>
          </div>
          <footer className="bg-violet-950 text-white p-2 text-xs">
            &copy; {new Date().getFullYear()} BN TRADING APP
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}