import * as React from 'react';
import { getDictionary } from '@/app/lib/dictionaries/dictionary';
import { LanguageProps } from '@/models/common/language-props';
import ConfirmSignUp from '@/components/identity/confirm-signup';

export default async function ConfirmRegistration({ params,  searchParams }: { params: LanguageProps["params"], searchParams: URLSearchParams }) {

  const dict = getDictionary(params.language)


// read query parameters  
  const queryStr = JSON.parse(JSON.stringify(searchParams));

  const token: string = queryStr.token as string;

console.log('token', token);


  return (
    <div className="w-full h-full text-slate-800 bg-white pl-[285px] pt-[50px]">
      <div className="mx-auto pl-4 border-l border-slate-700 ">
        <h2 className="text-2xl font-bold mb-4">Bestätigung Registrierung</h2>

        <div className="bg-slate-100 p-4 overflow-y-auto mb-4 w-[70%]">
       

          <ConfirmSignUp token={token}  />


        </div>

      </div>
    </div>
  );
}

