import { KpiCard } from "./dashboardCards";
import { Link, MousePointerClick, BarChart3, Activity } from "lucide-react";
import { calculateTrend } from "../utils/calculateTrend";
import { use } from "react";
export default function StatsCard({
  userAnalytics,
  perHourClicks,
  apiRequest,
  lastWeekClicks,
}: any) {
  console.log("User Analytics:", userAnalytics);
  console.log("Per Hour Clicks:", perHourClicks);
  console.log("API Request:", apiRequest);
  console.log("Last Week Clicks:", lastWeekClicks);
  const trendText = calculateTrend(
    userAnalytics?.totalClicks || 0,
    lastWeekClicks.data || 0,
  );
  const clicksToday = perHourClicks.data.reduce(
    (total: number, hourData: any) => total + hourData.total,
    0,
  );
  const totalApiRequests = apiRequest.usage.reduce(
    (total: number, data: any) => total + data.totalRequests,
    0,
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard
        title="Total Links"
        value={userAnalytics?.totalLinks || 0}
        icon={Link}
      />

      <KpiCard
        title="Total Clicks"
        value={userAnalytics?.totalClicks || 0}
        icon={MousePointerClick}
        trend={trendText.text}
      />

      <KpiCard title="Clicks Today" value={clicksToday} icon={Activity} />

      <KpiCard title="API Requests" value={totalApiRequests} icon={BarChart3} />
    </div>
  );
}
