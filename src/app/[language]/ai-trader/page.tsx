import { getDictionary } from '@/app/lib/dictionaries/dictionary';
import { LanguageProps } from '@/app/models/common/language-props';
import * as React from 'react';

export default async function AiTraderPage({ params }: LanguageProps) {

  const dict = getDictionary(params.language)

  return (
    <div className="w-full h-full text-slate-800 bg-white pl-[200px] pt-8 pb-[50px] overflow-y-auto ">
      <div className="mx-auto pl-4">
        <h2 className="text-2xl font-bold mb-4">AI TRADER</h2>
        {/* {session === null && <p className='text-orange-700 py-3'>{dict.BROKERS_SESSION_WARNING}</p>} */}
        <div className="bg-slate-100 p-4 overflow-x-auto mb-4 w-[70%]">
          
          <p className='mb-4'>
            Probieren Sie unseren AI Trader, der auf fortschrittlichen KI-Modellen basiert, um automatisierte Handelsstrategien zu entwickeln und umzusetzen. 
            Nutzen Sie die Kraft der künstlichen Intelligenz, um Markttrends zu analysieren und fundierte Handelsentscheidungen zu treffen.
          </p>
          <h3 className="text-xl font-bold mb-4">
            Wichtiger Hinweis: ...

          </h3>
        
        </div>
        <p className="my-2 font-bold">{dict.DISCLAIMER_NOTE}</p>
      </div>
    </div>
  );
}