import { authOptions } from '@/app/lib/auth';
import { getDictionary } from '@/app/lib/dictionaries/dictionary';
import { LanguageProps } from '@/models/common/language-props';
import * as React from 'react';

export default async function Broker({ params }: LanguageProps) {

  const dict = getDictionary(params.language)

  return (
    <div className="w-full h-full text-slate-800 bg-white pl-[200px] pt-8 pb-[50px] overflow-y-auto ">
      <div className="mx-auto pl-4">
        <h2 className="text-2xl font-bold mb-4">{dict.BROKERS_title}</h2>
        {/* {session === null && <p className='text-orange-700 py-3'>{dict.BROKERS_SESSION_WARNING}</p>} */}
        <div className="bg-slate-100 p-4 overflow-x-auto mb-4 w-[70%]">
          
          <p className='mb-4'>
            {dict.BROKERS_INTRO}
          </p>
          <h3 className="text-xl font-bold mb-4">{dict.BROKERS_STEPS_TITLE}</h3>
          <ul className="list-disc pl-5">
            <li>
              <div className='font-semibold'>{dict.BROKERS_STEP_1_TITLE}</div>
              {dict.BROKERS_STEP_1_DESC}
            </li>
            <li>
              <div className='font-semibold'>{dict.BROKERS_STEP_2_TITLE}</div>
              {dict.BROKERS_STEP_2_DESC}
            </li>
            <li>
              <div className='font-semibold'>{dict.BROKERS_STEP_3_TITLE}</div>
              {dict.BROKERS_STEP_3_DESC}
            </li>
            <li>
              <div className='font-semibold'>{dict.BROKERS_STEP_4_TITLE}</div>
              {dict.BROKERS_STEP_4_DESC}
            </li>
            <li>
              <div className='font-semibold'>{dict.BROKERS_STEP_5_TITLE}</div>
              {dict.BROKERS_STEP_5_DESC}
            </li>
            <li>
              <div className='font-semibold'>{dict.BROKERS_STEP_6_TITLE}</div>
              {dict.BROKERS_STEP_6_DESC}
            </li>
            <li>
              <div className='font-semibold'>{dict.BROKERS_STEP_7_TITLE}</div>
              {dict.BROKERS_STEP_7_DESC}
            </li>
            <li>
              <div className='font-semibold'>{dict.BROKERS_STEP_8_TITLE}</div>
              {dict.BROKERS_STEP_8_DESC}
            </li>
          </ul>   
        </div>
        <p className="my-2 font-bold">{dict.DISCLAIMER_NOTE}</p>
      </div>
    </div>
  );
}