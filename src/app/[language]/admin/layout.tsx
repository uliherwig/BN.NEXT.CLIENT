import ClientLayout from "@/app/components/common/client-layout";
import { LanguageProps } from "@/app/models/common/language-props";
import Navigation from "@/app/components/common/navigation";
import { NaviModel } from "@/app/models/common/navi-model";

export default async function AiTraderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LanguageProps["params"];
}) {
  const homelink = `/${params.language}/admin`;
  const executionLink = `/${params.language}/admin/alpaca`;
  const testLink = `/${params.language}/admin/test`;

  const navigationItems: NaviModel[] = [
    { url: homelink, name: "Home", title: "Home Page", icon: "HomeIcon" },
    { url: executionLink, name: "Alpaca", title: "Alpaca Page", icon: "SettingsIcon" },
    { url: testLink, name: "Test", title: "Test Page", icon: "ShowChartIcon" }
  ];
  return (
    <div className="flex bg-slate-100 text-slate-800 w-full h-full">
      <nav className="w-[150px] border-r border-slate-500">
        <Navigation language={params.language} header="AI Trader" Items={navigationItems} />
      </nav>
      <main className="h-full w-full">
        <ClientLayout>{children}</ClientLayout>
      </main>
    </div>
  );
}