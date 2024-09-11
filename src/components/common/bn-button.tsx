import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  label: string;
}

const BNButton: React.FC<ButtonProps> = ({ type, label }) => {
  return (
    <button type={type} className="border border-slate-400 w-full mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer" >
      {label.toUpperCase()}
    </button>
  );
};

export default BNButton;