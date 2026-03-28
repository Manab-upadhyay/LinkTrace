import PerLinkStatsCard from "../dashboard/links/analytics-per-link/PerLinkKpiCard";
import { useParams } from "react-router-dom";

import { apiService } from "@/service/apiService";
import { ChartPerLink } from "../dashboard/links/analytics-per-link/PerLinkChart";
import { useQuery } from "@tanstack/react-query";
import DashboardSkeleton from "../skeleton/DashboardSkeleton";
import { LiveStatus } from "../dashboard/links/analytics-per-link/LiveStatus";
export default function PerLinkAnalysisPage() {
  const { linkId } = useParams<{ linkId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["perLinkAnalytics", linkId],
    queryFn: () =>
      apiService.getDashboardPerLinkAnalytics(linkId!).then((res) => res.data),
    enabled: !!linkId, // Only run the query if linkId is available
  });
  console.log("perlink:", data);
  if (isLoading) {
    return <DashboardSkeleton />;
  }
  return (
    <div className="p-6 space-y-8">
      {/* KPI Section */}
      <PerLinkStatsCard
        data={data.summary}
        lastWeekClicks={data?.weeklyTrend}
      />
<LiveStatus linkId={linkId} />
      {/* Charts Section */}
      <ChartPerLink data={data?.hourly} />
    </div>
  );
}
