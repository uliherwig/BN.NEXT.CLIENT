"use client";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";

const Menu = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => {
        setExpanded(!expanded);
    }

    return (
        <div className="flex flex-col w-[200px] px-5 py-10">

            <ul>
                <li className="py-2">
                    <Link href="/" className="grid grid-cols-[18px_auto] items-center gap-2" title="Home">
                        <HomeIcon className="h-5 w-5 text-blue-500" />
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/alpaca" className="grid grid-cols-[18px_auto_18px] items-center gap-2" title="Alpaca"  onClick={toggleMenu} >
                        <BarChartIcon className="h-5 w-5 text-blue-500" />
                        Alpaca
                        <button className="flex justify-end items-end my-1">
                            {!expanded ? (
                                <KeyboardArrowDownIcon className="h-8 w-8 text-blue-500" />
                            ) : (
                                <KeyboardArrowUpIcon className="h-8 w-8 text-blue-500" />
                            )}
                        </button>
                    </Link>
                    <ul className="pl-7 text-sm" style={{ display: expanded ? 'block' : 'none' }}>
                        <li className="py-1">
                            <Link href="/alpaca" className="grid grid-cols-[18px_auto] items-center gap-2" title="Dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/alpaca" className="grid grid-cols-[18px_auto] items-center gap-2" title="charts">
                                Stockchart
                            </Link>
                        </li>
                        <li>
                            <Link href="/alpaca" className="grid grid-cols-[18px_auto] items-center gap-2" title="charts">
                                Trades
                            </Link>
                        </li>
                        <li>
                            <Link href="/alpaca" className="grid grid-cols-[18px_auto] items-center gap-2" title="charts">
                                Backtest
                            </Link>
                        </li>
                        <li>
                            <Link href="/alpaca" className="grid grid-cols-[18px_auto] items-center gap-2" title="charts">
                                Trade Settings
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>


        </div>
    );
}

export default Menu;