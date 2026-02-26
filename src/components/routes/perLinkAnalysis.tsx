import PerLinkStatsCard from "../dashboard/links/analytics-per-link/PerLinkStats_kpi-card";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService } from "@/service/apiService";
import { ChartPerLink } from "../dashboard/links/analytics-per-link/perLinkChart";

export default function PerLinkAnalysis() {
  const { linkId } = useParams<{ linkId: string }>();
  const [data, setData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [linkLastWeekClicks, setLinkLastWeekClicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("Link ID from URL:", linkId);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const [analyticsRes, hourlyRes, weeklyRes] = await Promise.all([
        apiService.getLinkAnalytics(linkId),
        apiService.getLinkAnalyticsHourly(linkId),
        apiService.getLastWeekClicksPerLink(linkId),
      ]);
      console.log("Analytics Response:", analyticsRes);
      console.log("Hourly Analytics Response:", hourlyRes);
      console.log("Last Week Clicks Per Link Response:", weeklyRes);
      if (weeklyRes.data) setLinkLastWeekClicks(weeklyRes.data);
      if (analyticsRes.data) setData(analyticsRes.data);
      if (hourlyRes.data) setChartData(hourlyRes.data);
      if (weeklyRes.data) setLinkLastWeekClicks(weeklyRes.data);

      setLoading(false);
    }

    fetchData();
  }, [linkId]);
  return (
    <div className="p-6 space-y-8">
      {/* KPI Section */}
      <PerLinkStatsCard
        data={data}
        loading={loading}
        lastWeekClicks={linkLastWeekClicks}
      />
      {/* Charts Section */}
      <ChartPerLink data={chartData} />
    </div>
  );
}
