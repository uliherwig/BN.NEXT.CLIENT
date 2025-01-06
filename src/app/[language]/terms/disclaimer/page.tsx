import { getDictionary } from '@/app/lib/dictionaries/dictionaries';
import { LanguageProps } from '@/models/common/language-props';
import * as React from 'react';

export default async function Disclaimer({ params }: LanguageProps) {

    const dict = await getDictionary(params.language)

    return (
        <div className="w-full h-full text-slate-800 bg-white pl-[285px] pt-[50px]">
            <div className="mx-auto pl-4 border-l border-slate-700 ">
                <h2 className="text-2xl font-bold mb-4">{dict.DISCLAIMER_TITLE}</h2>

                <div className="bg-slate-100 p-4 overflow-x-auto mb-4 w-[70%]">
                    <p className='mb-4'>
                        {dict.DISCLAIMER_INTRO}
                    </p>
                    <p className='mb-4'>
                        {dict.DISCLAIMER_CONTENT_1}
                    </p>
                    <p className='mb-4'>
                        {dict.DISCLAIMER_CONTENT_2}
                    </p>
                    <p className='mb-4'>
                        {dict.DISCLAIMER_CONTENT_3}
                    </p>
                    <p className='mb-4'>
                        {dict.DISCLAIMER_CONTENT_4}
                    </p>
                </div>
                <p className="my-2 font-bold">{dict.DISCLAIMER_NOTE}</p>
            </div>
        </div>
    );
}