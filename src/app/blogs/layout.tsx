import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { getLocale, getMessages } from 'next-intl/server';
import Link from "next/link";
import "../globals.css";



const BlogEintries = ['2024-8-1', '2024-8-2', '2024-8-3', '2024-8-4'];

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (

    <div className="flex bg-slate-100 text-slate-800 grid-middle w-full">
      <nav className="w-[350px] p-5 border-r border-slate-500">
        <h1 className="text-xl  font-bold mb-4">Blogs</h1>
        <h6 className="mb-4">Entwicklung BN Algo Trader</h6>
        <div className="w-full">

          <ul className="pl-8 text-sm">

            <li className="py-1">
              <Link href={`/blogs/`} title="BN Algo Trader">
                BN Algo Trader
              </Link>
            </li>

            {BlogEintries.map((entry) => (
              <li className="py-1" key={entry}>
                <Link href={`/blogs/${entry}`} title={`/${entry}`}>
                  {entry}
                </Link>
              </li>
            ))}

          </ul>
        </div>
      </nav>
      <main>
        <div className="h-full p-5 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>

  );
}