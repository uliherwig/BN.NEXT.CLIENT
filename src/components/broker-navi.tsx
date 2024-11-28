"use client";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import { useState } from "react";
import { usePathname } from 'next/navigation';
import { useDictionary } from "@/provider/dictionary-provider";

const BrokerNavi = () => {
    const [expanded, setExpanded] = useState(true);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const pathname = usePathname();
    const dictionary = useDictionary();

    const toggleMenu = () => {
        setExpanded(!expanded);
    }

    const linkClasses = 'grid grid-cols-[26px_auto] items-center text-gray-700 hover:text-gray-900';
    const activeLinkClasses = 'grid grid-cols-[26px_auto] items-center text-slate-50 font-bold bg-slate-700';
    const hoveredLinkClasses = 'grid grid-cols-[26px_auto] items-center text-slate-900  bg-slate-300';

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
            return "h-5 w-5  text-slate-50";
        }
        if (hoveredLink === path) {
            return "h-5 w-5 text-slate-800";
        }
        return "h-5 w-5 text-slate-800";
    };

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-[200px] pt-2">
            <ul>
                <li>
                    <Link
                        href="/brokers"
                        className='grid grid-cols-[30px_auto] items-center text-slate-700 hover:text-gray-900'
                        title={dictionary.NAVI_HOME}
                    >
                        <HomeIcon className="h-6 w-6 text-slate-800" />
                        {dictionary.NAVI_BROKER}
                    </Link>
                </li>
                <li>
                    <div className="grid grid-cols-[26px_auto_20px] gap-2 cursor-pointer mt-3 mb-2" onClick={toggleMenu}>
                        {!expanded ? (
                            <KeyboardArrowDownIcon className="h-6 w-6 text-slate-800" />
                        ) : (
                            <KeyboardArrowUpIcon className="h-6 w-6 text-slate-800" />
                        )}
                        {dictionary.NAVI_ALPACA}
                    </div>
                    <ul className="ml-7 p-1 px-2 bg-gray-200" style={{ display: expanded ? 'block' : 'none' }}>
                        <li className="my-2">
                            <Link
                                href="/brokers/alpaca/dashboard"
                                className={getLinkClasses('/brokers/alpaca/dashboard')}
                                title={dictionary.NAVI_DASHBOARD}
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/dashboard')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <DashboardIcon className={getIconLinkClasses('/brokers/alpaca/dashboard')} />
                                {dictionary.NAVI_DASHBOARD}
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href="/brokers/alpaca/strategy-test"
                                className={getLinkClasses('/brokers/alpaca/strategy-test')}
                                title={dictionary.NAVI_STRATEGY_TESTS}
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/strategy-test')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <ShowChartIcon className={getIconLinkClasses('/brokers/alpaca/strategy-test')} />
                                {dictionary.NAVI_STRATEGY_TESTS}
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href="/brokers/alpaca/review"
                                className={getLinkClasses('/brokers/alpaca/review')}
                                title={dictionary.NAVI_REVIEW}
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/review')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <FormatListBulletedIcon className={getIconLinkClasses('/brokers/alpaca/review')} />
                                {dictionary.NAVI_REVIEW}
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href="/brokers/alpaca/settings"
                                className={getLinkClasses('/brokers/alpaca/settings')}
                                title={dictionary.NAVI_SETTINGS}
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/settings')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <SettingsIcon className={getIconLinkClasses('/brokers/alpaca/settings')} />
                                {dictionary.NAVI_SETTINGS}
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href="/brokers/alpaca/info"
                                className={getLinkClasses('/brokers/alpaca/info')}
                                title={dictionary.NAVI_INFO}
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/info')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <InfoOutlinedIcon className={getIconLinkClasses('/brokers/alpaca/info')} />
                                {dictionary.NAVI_INFO}
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default BrokerNavi;