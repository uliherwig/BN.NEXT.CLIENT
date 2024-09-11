"use client";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";

const BrokerNavi = () => {
    const [expanded, setExpanded] = useState(true);

    const toggleMenu = () => {
        setExpanded(!expanded);
    }

    return (
        <div className="flex flex-col w-[200px]">

            <ul>
                <li>
                    <Link href="/brokers" className="grid grid-cols-[18px_auto_20px] items-center gap-2" title="Home">
                        <HomeIcon className="h-5 w-5 text-slate-600" />
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/brokers/alpaca" className="grid grid-cols-[18px_auto_18px] items-center gap-2" title="Alpaca">
                        <BarChartIcon className="h-5 w-5 text-slate-600" />
                        Alpaca
                        <button className="flex justify-end items-end my-1" onClick={toggleMenu} >
                            {!expanded ? (
                                <KeyboardArrowDownIcon className="h-8 w-8 text-slate-800" />
                            ) : (
                                <KeyboardArrowUpIcon className="h-8 w-8 text-slate-800" />
                            )}
                        </button>
                    </Link>
                    <ul className="pl-8 text-sm" style={{ display: expanded ? 'block' : 'none' }}>
                        <li>
                            <Link href="/brokers/alpaca/dashboard" className="grid grid-cols-[18px_auto] items-center gap-2" title="Dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/brokers/alpaca/dashboard" className="grid grid-cols-[18px_auto] items-center gap-2" title="charts">
                                Stockchart
                            </Link>
                        </li>
                        <li>
                            <Link href="/brokers/alpaca/dashboard" className="grid grid-cols-[18px_auto] items-center gap-2" title="charts">
                                Trades
                            </Link>
                        </li>
                        <li>
                            <Link href="/alpaca" className="grid grid-cols-[18px_auto] items-center gap-2" title="charts">
                                Backtest
                            </Link>
                        </li>
                        <li>
                            <Link href="/brokers/alpaca/settings" className="grid grid-cols-[18px_auto] items-center gap-2" title="charts">
                                Settings
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>


        </div>
    );
}

export default BrokerNavi;