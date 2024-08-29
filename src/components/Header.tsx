"use client";

import Link from "next/link";
import LanguageSwitch from "./LanguageSwitch";

const Header = () => {
  const linkClasses = "text-xs hover:bg-slate-600 text-white font-bold py-1 px-4 rounded";

  return (
    <div className="flex justify-between items-center p-1 w-full h-full">

      <Link href="/" title="home">
        <h1 className="w-[250px]">BN ALGO TRADER</h1>
      </Link>

      <div className="flex items-center w-full">
        <Link href="/" className={linkClasses} title="home">
          HOME
        </Link>
        <Link href="/brokers" className={linkClasses} title="brokers">
          BROKERS
        </Link>
        <Link href="/strategies" className={linkClasses} title="strategies">
          STRATEGIES
        </Link>
        <Link href="/blogs" className={linkClasses} title="Blog">
          BLOGS
        </Link>
      </div>
      <Link href="/login" className="text-xs hover:bg-slate-600 text-white py-1 px-4 rounded" title="Login">
        LOGIN
      </Link>
      <LanguageSwitch />
    </div>
  );
}

export default Header;