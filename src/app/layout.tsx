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

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className="bg-gray-100">
          <div className="flex flex-col h-screen">

            <header className="h-[40px] bg-violet-950 p-1 px-5 text-white">
              <Header />
            </header>

            <div className="flex flex-1">

              <nav className="grid-middle bg-violet-950">
                <Navigation />
              </nav>

              <main  className="grid-middle w-full bg-violet-950">
                {children}
              </main>
            </div>

            <footer className="h-[30px] bg-violet-950 text-white p-2 text-xs">
              &copy; {new Date().getFullYear()} BN TRADING APP
            </footer>

          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}