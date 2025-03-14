import { LanguageProps } from "@/models/common/language-props";
import { getDictionary } from "../lib/dictionaries/dictionary";
import { toast } from "react-toastify";


export default async function Page({ params }: LanguageProps) {
  const dict = getDictionary(params.language) 

  return (
    <div className="h-full items-center w-full pt-[10%] px-[20%]">
      <h1 className='text-slate-800 font-bold text-5xl'>{dict.HOME_title}</h1>
      <p className='text-slate-800 font-semibold text-2xl mt-6'>{dict.HOME_description}</p>
      
    </div>
  )

}