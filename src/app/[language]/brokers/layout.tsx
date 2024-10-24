import BrokerNavi from "@/components/broker-navi";
import "@/app/globals.css";

export default async function BrokerLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex bg-slate-100 text-slate-800 content-container w-full">
      <nav className="w-[240px] p-2 border-r border-slate-500"> 
        <BrokerNavi />
      </nav>
      <main className="h-full w-full">
        {children}
      </main>
    </div>
  );
}