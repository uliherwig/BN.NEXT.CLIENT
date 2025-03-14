"use client";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useDictionary } from "@/provider/dictionary-provider";
import { useSession } from "next-auth/react";

interface BrokerNaviProps {
    language: string;
}
const BrokerNavi: React.FC<BrokerNaviProps> = (props) => {
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
    const brokersLink = `/${props.language}/brokers`;

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
        <div className="flex flex-col w-[180px] pt-2">
            <ul>
                <li>
                    <Link
                        href={brokersLink}
                        className='grid grid-cols-[30px_auto] items-center text-slate-700 hover:text-gray-900'
                        title={dictionary.NAVI_BROKER}
                    >
                        <HomeIcon fontSize="small" />
                        <span className="font-semibold">{dictionary.NAVI_BROKER}</span>
                    </Link>
                </li>
                <li>
                    <div className="grid grid-cols-[26px_auto_20px] gap-2 cursor-pointer mt-3 mb-2" onClick={toggleMenu}>
                        {!expanded ? (
                            <KeyboardArrowDownIcon />
                        ) : (
                            <KeyboardArrowUpIcon />
                        )}
                        <span className="font-semibold">{dictionary.NAVI_ALPACA}</span>
                    </div>
                    <ul className="p-1 px-2 border-t border-b border-slate-800" style={{ display: expanded ? 'block' : 'none' }}>
                        <li className="my-2">
                            <Link
                                href={status === 'authenticated' ? `/${props.language}/brokers/alpaca/dashboard` : brokersLink}
                                className={getLinkClasses('/brokers/alpaca/dashboard')}
                                title={dictionary.NAVI_DASHBOARD}
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/dashboard')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <DashboardIcon fontSize="small" className={getIconLinkClasses('/brokers/alpaca/dashboard')} />
                                {dictionary.NAVI_DASHBOARD}
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href={status === 'authenticated' ? `/${props.language}/brokers/alpaca/strategy-test` : brokersLink}
                                className={getLinkClasses('/brokers/alpaca/strategy-test')}
                                title={dictionary.NAVI_STRATEGY_TESTS}
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/strategy-test')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <ShowChartIcon fontSize="small" className={getIconLinkClasses('/brokers/alpaca/strategy-test')} />
                                {dictionary.NAVI_STRATEGY_TESTS}
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href={status === 'authenticated' ? `/${props.language}/brokers/alpaca/review` : brokersLink}
                                className={getLinkClasses('/brokers/alpaca/review')}
                                title={dictionary.NAVI_REVIEW}
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/review')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <FormatListBulletedIcon fontSize="small" className={getIconLinkClasses('/brokers/alpaca/review')} />
                                {dictionary.NAVI_REVIEW}
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href={status === 'authenticated' ? `/${props.language}/brokers/alpaca/execution` : brokersLink}
                                className={getLinkClasses('/brokers/alpaca/execution')}
                                title={dictionary.NAVI_EXECUTION}
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/execution')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <SettingsIcon fontSize="small" className={getIconLinkClasses('/brokers/alpaca/execution')} />
                                {dictionary.NAVI_EXECUTION}
                            </Link>
                        </li>

                    </ul>
                </li>
            </ul>
            {status === 'authenticated' ? <div className="my-5"></div> :
                <div className="my-5 text-red-500 text-sm">You have to be authenticated to use the broker features</div>}
        </div>
    );
}

export default BrokerNavi;