"use client";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import ShowChartIcon from '@mui/icons-material/ShowChart';
// import info icon if needed
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useDictionary } from "@/provider/dictionary-provider";
import { useSession } from "next-auth/react";

interface AITraderNaviProps {
    language: string;
}
const AITraderNavi: React.FC<AITraderNaviProps> = (props) => {
    const [expanded, setExpanded] = useState(true);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const dictionary = useDictionary();

    useEffect(() => {
        if (session && session.user) {
        }
    }, [session]);

    const toggleMenu = () => {
        setExpanded(!expanded);
    }

    const linkClasses = 'grid grid-cols-[26px_auto] items-center text-gray-700 hover:text-gray-900';
    const activeLinkClasses = 'grid grid-cols-[26px_auto] items-center text-slate-50  bg-slate-700';
    const hoveredLinkClasses = 'grid grid-cols-[26px_auto] items-center text-slate-900  bg-slate-300';
    const homelink = `/${props.language}/ai-trader`;
    const dashboardLink = `/${props.language}/ai-trader/dashboard`;
    const executionLink = `/${props.language}/ai-trader/execution`;
    const modelsLink = `/${props.language}/ai-trader/ai-models`;

    const getLinkClasses = (path: string) => {
        const match = pathname.substring(3, pathname.length);
        if (match === path) {
            return activeLinkClasses;
        }
        if (hoveredLink === path) {
            return hoveredLinkClasses;
        }
        return linkClasses;
    };
    const getIconLinkClasses = (path: string) => {
        const match = pathname.substring(3, pathname.length);
        if (match === path) {
            return "h-[20px] w-[20px]  text-slate-50";
        }
        if (hoveredLink === path) {
            return "h-[20px] w-[20px] text-slate-800";
        }
        return "h-[20px] w-[20px] text-slate-800";
    };

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-full relative w-full pt-2">
            <div className="flex-1 p-1 ">
                <ul>
                    <li className="mb-4">
                        <h2 className="text-lg font-bold text-slate-800">{dictionary.HEADER_AI}</h2>
                    </li>
                
                    <li className="my-2">
                        <Link
                            href={homelink}
                            className={getLinkClasses(homelink)}
                            title={dictionary.NAVI_DASHBOARD}
                            onMouseOver={() => setHoveredLink(homelink)}
                            onMouseOut={() => setHoveredLink(null)}
                        >
                            <InfoIcon fontSize="small" className={getIconLinkClasses(homelink)} />
                            INFO
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link
                            href={status === 'authenticated' ? dashboardLink : homelink}
                            className={getLinkClasses(dashboardLink)}
                            title={dictionary.NAVI_DASHBOARD}
                            onMouseOver={() => setHoveredLink(dashboardLink)}
                            onMouseOut={() => setHoveredLink(null)}
                        >
                            <DashboardIcon fontSize="small" className={getIconLinkClasses(dashboardLink)} />
                            {dictionary.NAVI_DASHBOARD}
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link
                            href={status === 'authenticated' ? modelsLink : homelink}
                            className={getLinkClasses(modelsLink)}
                            title={dictionary.NAVI_DASHBOARD}
                            onMouseOver={() => setHoveredLink(modelsLink)}
                            onMouseOut={() => setHoveredLink(null)}
                        >
                            <ShowChartIcon fontSize="small" className={getIconLinkClasses(modelsLink)} />
                            AI-Models
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link
                            href={status === 'authenticated' ? executionLink : homelink}
                            className={getLinkClasses(executionLink)}
                            title={dictionary.NAVI_EXECUTION}
                            onMouseOver={() => setHoveredLink(executionLink)}
                            onMouseOut={() => setHoveredLink(null)}
                        >
                            <SettingsIcon fontSize="small" className={getIconLinkClasses(executionLink)} />
                            {dictionary.NAVI_EXECUTION}
                        </Link>
                    </li>
              
                </ul>
                {status === 'authenticated' ? <div className="my-5"></div> :
                    <div className="my-5 text-red-500 text-sm">You have to be authenticated to use the broker features</div>}
            </div>           
        </div>
    );
}

export default AITraderNavi;