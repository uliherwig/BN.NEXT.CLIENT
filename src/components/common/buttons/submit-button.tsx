import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom'

interface ButtonProps {
  label: string;
  handleFormState: (pending: boolean) => void;
}

const SubmitButton: React.FC<ButtonProps> = ({ label, handleFormState }) => {
  const { pending } = useFormStatus()

  useEffect(() => {
    handleFormState(pending);
  }, [pending, handleFormState]);

  return (
    <button type='submit' disabled={pending}
      className="bg-lime-700 text-white text-normal px-4 h-[28px] cursor-pointer w-full"  >
      {pending ? 'STARTING...' : label}
    </button>
  );
};

export default SubmitButton;