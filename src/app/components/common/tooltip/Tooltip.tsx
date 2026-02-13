import React from 'react';

interface TooltipProps {
    children: any;
    text: string;
}

const Tooltip:  React.FC<TooltipProps>  = ({ text, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center">
        <div className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">
          {text}
        </div>
        <div className="w-3 h-3 -mt-1 rotate-45 bg-black"></div>
      </div>
    </div>
  );
};

export default Tooltip;