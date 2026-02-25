import { KpiCard } from "./dashboardCards";
import { Link, MousePointerClick, BarChart3, Activity } from "lucide-react";

export default function StatsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard title="Total Links" value="124" icon={Link} />

      <KpiCard
        title="Total Clicks"
        value="12,483"
        icon={MousePointerClick}
        trend="+8% from last week"
      />

      <KpiCard title="Clicks Today" value="842" icon={Activity} />

      <KpiCard title="API Requests" value="9,201" icon={BarChart3} />
    </div>
  );
}
