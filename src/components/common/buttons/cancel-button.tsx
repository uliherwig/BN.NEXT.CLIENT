import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom'

interface ButtonProps {
  label: string;
  onCancel: Function;
}

const CancelButton: React.FC<ButtonProps> = ({ label, onCancel }) => {

  return (
    <button type='button'
      className="bg-stone-500 text-white text-normal px-4 h-[28px] w-full cursor-pointer" onClick={() => onCancel()}  >
      {label}
    </button>
  );
};

export default CancelButton;