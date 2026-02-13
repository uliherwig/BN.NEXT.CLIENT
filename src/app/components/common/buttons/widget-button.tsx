import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  label: string;
  method: Function;
  disabled?: boolean;
}

const WidgetButton: React.FC<ButtonProps> = ({ type, label, method, disabled  }) => {
  const btnClass = disabled ? 'bg-slate-400 text-white text-normal px-4 h-[28px] cursor-not-allowed' : 'bg-slate-600 text-white text-normal px-4 h-[28px] cursor-pointer';
  return (
    <button type={type} className={btnClass} onClick={() => method()} disabled={disabled}>
      {label}
    </button>
  );
};

export default WidgetButton;