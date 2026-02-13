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
import { useSession } from "next-auth/react";
import { NaviModel } from "@/app/models/common/navi-model";


interface NavigationProps {
    language: string;
    header: string | null;
    Items: NaviModel[];
}
const Navigation: React.FC<NavigationProps> = (props) => {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    useEffect(() => {
        if (session && session.user) {
        }
    }, [session]);

    const naviCss = 'grid grid-cols-[26px_auto] items-center text-gray-700';
    const activeNaviCss = 'grid grid-cols-[26px_auto] items-center text-slate-50  bg-slate-700';
    const hoveredNaviCss = 'grid grid-cols-[26px_auto] items-center text-slate-900  bg-slate-300';

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "HomeIcon":
                return <HomeIcon fontSize="small" />;
            case "DashboardIcon":
                return <DashboardIcon fontSize="small" />;
            case "KeyboardArrowUpIcon":
                return <KeyboardArrowUpIcon fontSize="small" />;
            case "KeyboardArrowDownIcon":
                return <KeyboardArrowDownIcon fontSize="small" />;
            case "FormatListBulletedIcon":
                return <FormatListBulletedIcon fontSize="small" />;
            case "SettingsIcon":
                return <SettingsIcon fontSize="small" />;
            case "ShowChartIcon":
                return <ShowChartIcon fontSize="small" />;
            case "InfoIcon":
                return <InfoIcon fontSize="small" />;
            default:
                return <InfoIcon fontSize="small" />;
        }
    };
 
    return (
        <div className="flex flex-col h-full relative w-full pt-2">
            <div className="flex-1 p-1 ">
                <ul>
                    <li className="mb-4">
                        <h2 className="text-lg font-bold text-slate-800">{props.header}</h2>
                    </li>

                    {props.Items.map((item) => (
                        <li key={item.url} className="my-2">
                            <Link
                                href={item.url}
                                className={`${naviCss}  ${pathname === item.url ? `${activeNaviCss}` : ''}`}
                                title={item.title} >
                                {getIcon(item.icon)}
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                {status === 'authenticated' ? <div className="my-5"></div> :
                    <div className="my-5 text-red-500 text-sm">You have to be authenticated to use the broker features</div>}
            </div>
        </div>
    );
}

export default Navigation;