
import { LanguageProps } from '@/models/common/language-props';
import { getDictionary } from "@/app/lib/dictionaries/dictionary";
import * as React from 'react';

export default async function Impressum({ params }: LanguageProps) {

    const dict = getDictionary(params.language)

    return (
        <div className="w-full h-full text-slate-800 bg-white pl-[285px] pt-[50px]">
            <div className="mx-auto pl-4 border-l border-slate-700 ">
                <h2 className="text-2xl font-bold mb-4">{dict.IMPRINT_TITLE}</h2>
                <p className="mb-2">{dict.IMPRINT_TMG}</p>
                <p className="mb-1">Ulrich Herwig</p>
                <p className="mb-1">Strasse 1</p>
                <p className="mb-4">61234 Stadt</p>
                <p className="mb-4">info(at)bn-project.com</p>
                <div className="bg-slate-100 p-4 overflow-x-auto mb-4 w-[70%]">
                    <p className="mb-4">{dict.IMPRINT_DISCLAIMER}</p>
                    <p className="mb-4">{dict.IMPRINT_COPYRIGHT}</p>
                </div>
                <p className="my-2 font-bold">{dict.IMPRINT_NOTE}</p>  </div>
        </div>

    );
}