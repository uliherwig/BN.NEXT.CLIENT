"use client";

import Link from "next/link";
import logo from "@/app/assets/bn-logo.svg";
import Image from 'next/image'
import LanguageSwitch from "./language-switch";
import AuthenticationMenu from "./identity/auth-menu";
import { usePathname } from "next/navigation";

interface HeaderProps {
  dict: Record<string, string>;
  language: string;
}
const Header: React.FC<HeaderProps> = (params) => {
  const pathname = usePathname();

  const linkClasses = "text-xs hover:bg-slate-600 text-white font-bold py-1 px-4 rounded";
  const selectedClasses = "bg-slate-500";
  const dict = params.dict;
  const language = params.language;
  return (
    <div className="flex justify-between items-center p-1 w-full h-full">

      <Image
        src={logo}
        width={40}
        height={40}
        alt="BN-Project Logo"
      />
      <Link href={`/${language}`} title="home">
        <h1 className="ml-5 w-[200px]">{dict.HEADER_title}</h1>
      </Link>

      <div className="flex items-center w-full">
        <Link
          href={`/${language}`}
          className={`${linkClasses} ${pathname === `/${language}` ? selectedClasses : ""}`}
          title="Home"
        >
          HOME
        </Link>
        <Link
          href={`/${language}/strategy`}
          className={`${linkClasses} ${pathname.includes(`/${language}/strategy`) ? selectedClasses : ""}`}
          title="Strategies"
        >
          {dict.HEADER_Strategy}
        </Link>
        <Link
          href={`/${language}/ai-trader`}
          className={`${linkClasses} ${pathname.includes(`/${language}/ai-trader`) ? selectedClasses : ""}`}
          title="AI Models"
        >
          {dict.HEADER_AI}
        </Link>
        <Link
          href={`/${language}/blogs`}
          className={`${linkClasses} ${pathname.includes(`/${language}/blogs`) ? selectedClasses : ""}`}
          title="Blog"
        >
          {dict.HEADER_Blogs}
        </Link>
        <Link
          href={`/${language}/admin`}
          className={`${linkClasses} ${pathname.includes(`/${language}/admin`) ? selectedClasses : ""}`}
          title="Admin"
        >
          ADMIN
        </Link>
      </div>
      <AuthenticationMenu language={language} />
      <LanguageSwitch language={language} />
    </div>
  );
}

export default Header;