import { LanguageProps } from "@/models/common/LanguageProps";
import { getDictionary } from "../lib/dictionaries/dictionaries";


export default async function Page({ params }: LanguageProps) {

  console.log('params:', params)

  const dict = await getDictionary(params.language) 

  return (
    <div className="content-container flex flex-col items-center w-full pt-[10%]">
      <h1 className='text-slate-800 font-bold text-5xl'>{dict.HOME_title}</h1>
      <p className='text-slate-800 font-semibold text-2xl mt-6'>{dict.HOME_description}</p>
    </div>
  )

}