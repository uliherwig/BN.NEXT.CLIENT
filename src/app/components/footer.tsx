import Link from "next/link";

interface FooterProps {
    dict: Record<string, string>;
    language: string;
}
const Footer: React.FC<FooterProps> = ({ dict, language }) => {

    const linkClasses = "text-xs hover:bg-slate-600 text-white py-1 px-4 rounded";

    return (
        <div className="flex items-left p-1 w-full h-full">
            <div className="text-xs w-[20%] py-1">&copy; {new Date().getFullYear()} {dict.HOME_title} </div>

            <div className="flex items-center justify-center w-[60%]" >
                <Link href={`/${language}/terms/impressum`} className={linkClasses} title={dict.FOOTER_IMPRESSUM}>
                    {dict.FOOTER_IMPRESSUM}
                </Link>          
                <Link href={`/${language}/terms/disclaimer`} className={linkClasses} title={dict.FOOTER_DISCLAIMER}>
                    {dict.FOOTER_DISCLAIMER}
                </Link>
                <Link href={`/${language}/terms/contact`} className={linkClasses} title={dict.FOOTER_CONTACT}>
                    {dict.FOOTER_CONTACT}
                </Link>
            </div>
        </div>
    );
}

export default Footer;