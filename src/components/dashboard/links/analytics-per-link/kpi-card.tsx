import { KpiCard } from "./per-link-stats";
import { MousePointerClick, Globe, Smartphone, Activity } from "lucide-react";

export default function PerLinkStatsCard() {
  return (
    <div className="flex flex-col md:flex-col md:gap-6">
      <KpiCard
        title="Total Clicks"
        value="1,243"
        icon={MousePointerClick}
        trend="+"
      />
      <KpiCard title="Clicks Today" value="82" icon={Activity} trend="+" />
      ̥
      <KpiCard title="Top Country" value="India" icon={Globe} trend="-" />
      <KpiCard title="Top Device" value="Mobile" icon={Smartphone} />
    </div>
  );
}
