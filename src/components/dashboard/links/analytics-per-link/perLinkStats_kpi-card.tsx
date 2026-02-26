import { KpiCard } from "./per-link-stats";
import { MousePointerClick, Globe, Smartphone, Activity } from "lucide-react";

export default function PerLinkStatsCard({
  data = [],
  loading,
  lastWeekClicks,
}: any) {
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }
  console.log("Per Link Data:", data);

  //  1. Total Clicks
  const totalClicks = data.LinkDetails.length;

  //  2. Clicks Today
  const today = new Date().toDateString();

  const clicksToday = data.LinkDetails.filter((item: any) => {
    return new Date(item.createdAt).toDateString() === today;
  }).length;

  // 🔥 3. Top Country
  const countryMap: Record<string, number> = {};

  data.LinkDetails.forEach((item: any) => {
    const country = item.location?.countryName || "Unknown";
    countryMap[country] = (countryMap[country] || 0) + 1;
  });

  const topCountry =
    Object.entries(countryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  // 🔥 4. Top Device (Basic UA check)
  const deviceMap: Record<string, number> = {};

  data.LinkDetails.forEach((item: any) => {
    const ua = item.userAgent || "";

    let device = "Desktop";

    if (/mobile/i.test(ua)) device = "Mobile";
    if (/tablet/i.test(ua)) device = "Tablet";

    deviceMap[device] = (deviceMap[device] || 0) + 1;
  });

  const topDevice =
    Object.entries(deviceMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard
        title="Total Clicks"
        value={totalClicks}
        icon={MousePointerClick}
        trend={`${lastWeekClicks.data.percentage}% from last 7 days`}
        trendColor={lastWeekClicks.data.isPositive ? "green" : "red"}
      />

      <KpiCard title="Clicks Today" value={clicksToday} icon={Activity} />

      <KpiCard title="Top Country" value={topCountry} icon={Globe} />

      <KpiCard title="Top Device" value={topDevice} icon={Smartphone} />
    </div>
  );
}
