import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom'

interface ButtonProps {
  label: string;
  handleFormState: (pending: boolean) => void;
}

const SubmitButton: React.FC<ButtonProps> = ({ label, handleFormState }) => {
  const { pending } = useFormStatus()

  useEffect(() => {
    console.log('pending:', pending);

    handleFormState(pending);



  }, [pending, handleFormState]);

  return (
    <button type='submit' disabled={pending}
      className="border border-slate-400 w-full mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer"  >
      {pending ? 'STARTING...' : label.toUpperCase()}
    </button>
  );
};

export default SubmitButton;