import React, { useState } from 'react';

interface CheckboxSlateProps {
    name: string;
    label : string;
}

const CheckboxSlate: React.FC<CheckboxSlateProps> = ({name, label}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className="flex items-center cursor-pointer">
            <input 
                type="checkbox"
                name={name} 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
                className="hidden peer" 
            />
            <span className={`w-5 h-5 border border-slate-400 flex items-center justify-center transition-colors duration-200 ${isChecked ? 'bg-[#990033] border-transparent' : ''}`}>
                {isChecked && (
                    <svg 
                        className="w-3 h-3 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="5" 
                            d="M5 13l4 4L19 7" 
                        />
                    </svg>
                )}
            </span>
            {label.length > 0 && <span className="ml-2">{label}</span>}         
        </label>
    );
};

export default CheckboxSlate;
