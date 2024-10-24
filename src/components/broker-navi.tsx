"use client";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import { useState } from "react";
import { usePathname } from 'next/navigation';

const BrokerNavi = () => {
    const [expanded, setExpanded] = useState(true);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const pathname = usePathname();

    const toggleMenu = () => {
        setExpanded(!expanded);
    }

    const linkClasses = 'grid grid-cols-[26px_auto] items-center text-gray-700 hover:text-gray-900';
    const activeLinkClasses = 'grid grid-cols-[26px_auto] items-center text-slate-50 font-bold bg-slate-700';
    const hoveredLinkClasses = 'grid grid-cols-[26px_auto] items-center text-slate-900  bg-slate-300';

    const getLinkClasses = (path: string) => {
        const match = pathname.substring(3, pathname.length);
        console.log('pathname:', match, 'path:', path);
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

    return (
        <div className="flex flex-col w-[200px]">
            <ul>
                <li>
                    <Link
                        href="/brokers"
                        className='grid grid-cols-[30px_auto] items-center text-gray-700 hover:text-gray-900'
                        title="Home"
                    >
                        <HomeIcon className="h-6 w-6 text-slate-800"  />
                        Broker
                    </Link>
                </li>
                <li >
                    <div className="grid grid-cols-[26px_auto_20px] gap-2 cursor-pointer mt-3 mb-2" onClick={toggleMenu}>
                        {!expanded ? (
                            <KeyboardArrowDownIcon className="h-6 w-6 text-slate-800" />
                        ) : (
                            <KeyboardArrowUpIcon className="h-6 w-6 text-slate-800" />
                        )}
                        Alpaca
                    </div>
                    <ul className="p-1 px-2 bg-slate-300" style={{ display: expanded ? 'block' : 'none' }}>
                        <li className="my-2">
                            <Link
                                href="/brokers/alpaca/dashboard"
                                className={getLinkClasses('/brokers/alpaca/dashboard')}
                                title="Dashboard"
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/dashboard')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <DashboardIcon className={getIconLinkClasses('/brokers/alpaca/dashboard')} />
                                Dashboard
                            </Link>
                        </li>
                        <li className="my-2">
                        <Link
                                href="/brokers/alpaca/backtest"
                                className={getLinkClasses('/brokers/alpaca/backtest')}
                                title="Backtest"
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/backtest')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <RadioButtonCheckedIcon  className={getIconLinkClasses('/brokers/alpaca/backtest')} />
                         
                                Strategy Tests
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href="/brokers/alpaca/info"
                                className={getLinkClasses('/brokers/alpaca/trades')}
                                title="Trades"
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/trades')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <FormatListBulletedIcon  className={getIconLinkClasses('/brokers/alpaca/trades')} />
                                Test Results
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href="/brokers/alpaca/backtest"
                                className={getLinkClasses('/brokers/alpaca/backtest')}
                                title="Backtest"
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/backtest')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                     <BarChartIcon  className={getIconLinkClasses('/brokers/alpaca/stockchart')} />
                                Charting
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href="/brokers/alpaca/settings"
                                className={getLinkClasses('/brokers/alpaca/settings')}
                                title="Settings"
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/settings')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <SettingsIcon  className={getIconLinkClasses('/brokers/alpaca/settings')} />
                                Settings
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                href="/brokers/alpaca/info"
                                className={getLinkClasses('/brokers/alpaca/info')}
                                title="Info"
                                onMouseOver={() => setHoveredLink('/brokers/alpaca/info')}
                                onMouseOut={() => setHoveredLink(null)}
                            >
                                <InfoOutlinedIcon  className={getIconLinkClasses('/brokers/alpaca/info')} />
                                Info
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default BrokerNavi;