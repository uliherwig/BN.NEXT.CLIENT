"use client";

import LanguageSwitch from "./LanguageSwitch";

const Header = () => {

    return (
        <div className="flex justify-between items-center p-0">
        <h1>BN TRADING APP</h1>
        <LanguageSwitch />
      </div>
    );
}

export default Header;