import BrokerNavi from "@/components/broker-navi";
import { LanguageProps } from "@/models/common/language-props";

export default async function BrokerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LanguageProps["params"];
}) {

  return (
    <div className="flex bg-slate-100 text-slate-800 w-full h-full">
      <nav className="w-[250px] border-r border-slate-500"> 
        <BrokerNavi language={params.language} />
      </nav>
      <main className="h-full w-full">       
        {children}
      </main>

    </div>
  );
}