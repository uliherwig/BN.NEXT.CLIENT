"use client";

import LanguageSwitch from "./LanguageSwitch";

const Header = () => {

    return (
        <div className="flex justify-between items-center p-1 w-full h-full">
        <h1>BN TRADING APP</h1>
        <LanguageSwitch />
      </div>
    );
}

export default Header;