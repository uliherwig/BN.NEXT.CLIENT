import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BN-TRADER PAGE",
  description: "bn-trader page",
};

interface LayoutProps {
  children: React.ReactNode;
}

const PageLayout = async ({ children }: LayoutProps) => {

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <header className="bg-violet-950 p-3 text-white">
          <h1>BN TRADING APP</h1>
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
      </body>
    </html>
  );
}

export default PageLayout;

