import BrokerNavi from "@/components/broker-navi";
import "@/app/globals.css";

const BlogEintries = ['2024-8-1', '2024-8-2', '2024-8-3', '2024-8-4'];

export default async function BrokerLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex bg-slate-100 text-slate-800 content-container w-full">
      <nav className="w-[240px] p-3 px-5 border-r border-slate-500">
        
      <div className="text-slate-800 text-lg font-bold mb-4">Broker</div>
        <h6 className="mb-4">Aktuell verfügbare Broker</h6>
        <BrokerNavi />
      </nav>
      <main className="h-full w-full content-container">
        {children}
      </main>
    </div>
  );
}