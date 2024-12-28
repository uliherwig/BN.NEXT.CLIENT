import Link from "next/link";
import LanguageSwitch from "../language-switch";
import AuthenticationMenu from "../identity/auth-menu";

interface HeaderProps {
  dict: Record<string, string>;
  language: string;
}
const Header: React.FC<HeaderProps> =  (params) => {
  const linkClasses = "text-xs hover:bg-slate-600 text-white font-bold py-1 px-4 rounded";

  const dict = params.dict;
  const language = params.language;

  return (
    <div className="flex justify-between items-center p-1 w-full h-full">
    <Link href={`/${language}`} title="home">
      <h1 className="w-[250px]">{dict.HEADER_title}</h1>
    </Link>

    <div className="flex items-center w-full">
      <Link href={`/${language}`} className={linkClasses} title="home">
        HOME
      </Link>
      <Link href={`/${language}/brokers`} className={linkClasses} title="brokers">
        {dict.HEADER_Brokers}
      </Link>
      <Link href={`/${language}/strategies`} className={linkClasses} title="strategies">
        {dict.HEADER_Strategies}
      </Link>
      <Link href={`/${language}/blogs`} className={linkClasses} title="Blog">
        {dict.HEADER_Blogs}
      </Link>
    </div>
    <AuthenticationMenu dict={dict} />
    <LanguageSwitch />
  </div>
  );
}

export default Header;