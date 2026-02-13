import ClientLayout from "@/app/components/common/client-layout";
import Navigation from "@/app/components/common/navigation";
import { LanguageProps } from "@/app/models/common/language-props";
import { NaviModel } from "@/app/models/common/navi-model";

export default async function StrategyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LanguageProps["params"];
}) {

  const infoLink = `/${params.language}/strategy/alpaca`;
  const dashboardLink = `/${params.language}/strategy/alpaca/dashboard`;
  const executionLink = `/${params.language}/strategy/alpaca/execution`;
  const strategyTestLink = `/${params.language}/strategy/alpaca/strategy-test`;
  const reviewLink = `/${params.language}/strategy/alpaca/review`;

  const navigationItems: NaviModel[] = [
    { url: infoLink, name: "Info", title: "Info Page", icon: "InfoIcon" },

    { url: dashboardLink, name: "Dashboard", title: "Dashboard Page", icon: "DashboardIcon" },
    { url: executionLink, name: "Execution", title: "Execution Page", icon: "SettingsIcon" },
    { url: strategyTestLink, name: "Strategy Test", title: "Strategy Test Page", icon: "ShowChartIcon" },
    { url: reviewLink, name: "Review", title: "Review Page", icon: "FormatListBulletedIcon" }
  ];

  return (
    <div className="flex bg-slate-100 text-slate-800 w-full h-full">
      <nav className="w-[150px] border-r border-slate-500"> 
        <Navigation language={params.language} header="Strategy" Items={navigationItems} />        
      </nav>
      <main className="h-full w-full">       
        <ClientLayout>{children}</ClientLayout>
      </main>
    </div>
  );
}