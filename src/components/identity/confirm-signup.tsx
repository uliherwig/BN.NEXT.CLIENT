'use client'

import { useDictionary } from "@/provider/dictionary-provider";
import WidgetButton from "../common/buttons/widget-button";
import { useEffect, useState } from 'react';


const ConfirmSignUp = ({ token }: { token: string }) => {
  const dictionary = useDictionary();
  const [confirmed, setConfirmed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string>('');


  const confirmRegistration = async () => {
    const endpoint = `/api/identity`;
    const res = await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify({ token: token }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.ok) {
      const result = await res.json();
      setSuccess(result.success);
      if (result.message && result.message === 'EmailVerified') {
        setMessage('Ihre Email ist bereits bestätigt. Bitte loggen Sie sich ein.');
      } else if (result.message && result.message === 1) {
        setMessage('Es wurde kein Benutzer mit diesem Token gefunden. Bitte überprüfen Sie den Link oder kontaktieren Sie den Support.');
      } else {
        setSuccess(false);
        setMessage('Leider ist ein Fehler aufgetreten. Bitte kontaktieren Sie den Support.');
      }
    }
    else {
      setSuccess(false);
      setMessage('Leider ist ein Fehler aufgetreten. Bitte kontaktieren Sie den Support.');
    }
    setConfirmed(true);
  }

  if (!dictionary) {
    return <div>Loading...</div>;
  }
  return (   

      <div className="h-full p-5">
        {!confirmed && <div className="text-slate-800">
          Bitte bestätigen Sie Ihre Registrierung, um fortzufahren.
          <div className="text-slate-800 text-lg font-bold mb-4"></div>
          <WidgetButton type='button' label="Bestätigen" method={confirmRegistration} />
        </div>}

        {confirmed && <div className="text-slate-800">
          {success && <div>
            Vielen Dank für Ihre Registrierung. Bitte loggen Sie sich ein.

            <div className="mt-5">
              <a href={`/auth/account`} className='text-blue-500'>{dictionary.AUTH_login}</a>
            </div>
          </div>}
          {!success && <div className='text-red-800'>
            {message}
          </div>}
        </div>}
      </div>
    )
}

export default ConfirmSignUp;


