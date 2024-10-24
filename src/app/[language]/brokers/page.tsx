import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import * as React from 'react';


export default async function AlpacaDashboard() {
  const session = await getServerSession(authOptions) 

  return (
    <div className="bg-primary p-4">
        <h1 className='text-headline text-primary mb-2'>Broker</h1>
        <h2 className='text-subhead text-primary mb-2'>Erklärungen zu Brokern</h2>
        <p className="text-normal text-primary">Wählen Sie einen Broker</p>
        <p className="text-normal text-primary">Rufen Sie die Einstellungen auf</p>
        <p className="text-normal text-primary">Tragen Sie Ihre Login daten für die Broker API ein</p>
        <p className="text-normal text-primary">Speichern Sie die Einstellungen</p>   
        {session === null && <p className='text-orange-700 py-3'>Für die Nutzung der Brokerseiten müssen Sie angemeldet sein.  </p>}  
    </div>
  );
}