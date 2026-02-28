import PerLinkStatsCard from "../dashboard/links/analytics-per-link/perLinkStats_kpi-card";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService } from "@/service/apiService";
import { ChartPerLink } from "../dashboard/links/analytics-per-link/perLinkChart";
import { useQuery } from "@tanstack/react-query";

export default function PerLinkAnalysis() {
  const { linkId } = useParams<{ linkId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["perLinkAnalytics", linkId],
    queryFn: () =>
      apiService.getDashboardPerLinkAnalytics(linkId!).then((res) => res.data),
    enabled: !!linkId, // Only run the query if linkId is available
  });
  console.log("perlink:", data);
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }
  return (
    <div className="p-6 space-y-8">
      {/* KPI Section */}
      <PerLinkStatsCard
        data={data.summary}
        lastWeekClicks={data?.weeklyTrend}
      />
      {/* Charts Section */}
      <ChartPerLink data={data?.hourly} />
    </div>
  );
}
