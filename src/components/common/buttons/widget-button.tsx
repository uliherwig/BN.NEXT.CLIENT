import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  label: string;
  method: Function;
}

const WidgetButton: React.FC<ButtonProps> = ({ type, label, method,  }) => {
  return (
    <button type={type} className='bg-green-800 text-white text-normal px-4 h-[28px] cursor-pointer' onClick={() => method()} >
      {label}
    </button>
  );
};

export default WidgetButton;