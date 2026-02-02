import { getDictionary } from '@/app/lib/dictionaries/dictionary';
import { LanguageProps } from '@/models/common/language-props';
import * as React from 'react';

export default async function AdminPage({ params }: LanguageProps) {

  const dict = getDictionary(params.language)

  return (
    <div className="w-full h-full text-slate-800 bg-white pl-[200px] pt-8 pb-[50px] overflow-y-auto ">
      <div className="mx-auto pl-4">
        <h2 className="text-2xl font-bold mb-4">ADMIN AREA</h2>
        {/* {session === null && <p className='text-orange-700 py-3'>{dict.BROKERS_SESSION_WARNING}</p>} */}
        <div className="bg-slate-100 p-4 overflow-x-auto mb-4 w-[70%]">

          <div></div>
          
              
        
        </div>
       
      </div>
    </div>
  );
}