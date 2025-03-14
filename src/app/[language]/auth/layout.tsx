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
      <main className="h-full w-full">
        {children}
      </main>
    </div>
  );
}