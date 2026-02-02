import ClientLayout from "@/components/ai-trader/ClientLayout";
import AITraderNavi from "@/components/ai-trader/navi";
import { LanguageProps } from "@/models/common/language-props";

export default async function AiTraderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LanguageProps["params"];
}) {

  return (
    <div className="flex bg-slate-100 text-slate-800 w-full h-full">
      <nav className="w-[150px] border-r border-slate-500"> 
        <AITraderNavi language={params.language} />
      </nav>
      <main className="h-full w-full">       
        <ClientLayout>{children}</ClientLayout>
      </main>

    </div>
  );
}