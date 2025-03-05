import * as React from 'react';
import "@/app/globals.css";
import { getDictionary } from '@/app/lib/dictionaries/dictionary';
import { LanguageProps } from '@/models/common/language-props';
import MyAccount from '@/components/alpaca/my-account';
import MyUserAccount from '@/components/identity/my-user-account';
import { useSearchParams } from 'next/navigation';

export default async function UserAccount({ params,  searchParams }: { params: LanguageProps["params"], searchParams: URLSearchParams }) {

 

  const dict = getDictionary(params.language)

  return (
    <div className="w-full h-full text-slate-800 bg-white pl-[285px] pt-[50px]">
      <div className="mx-auto pl-4 border-l border-slate-700 ">
        <h2 className="text-2xl font-bold mb-4">{dict.AUTH_myaccount}</h2>

        <div className="bg-slate-100 p-4 overflow-x-auto mb-4 w-[70%]">
          <MyUserAccount  searchParams={searchParams} language={params.language} />
        </div>
        <p className="my-2 font-bold">{dict.DISCLAIMER_NOTE}</p>
      </div>
    </div>
  );
}