import StatsCard from "../dashboard/dashBoardKpi-Card";
import { DashboardChart } from "../dashboard/LinkStatchart";
import LinkTable from "../dashboard/links/link";
import { AddLinkDialog } from "../dashboard/links/adddialog";
import { useEffect, useState } from "react";
import { apiService } from "@/service/apiService";

export default function Dashboard() {
  const [userAnalytics, setUserAnalytics] = useState<any>(null);
  const [perHourClicks, setPerHourClicks] = useState<any[]>([]);
  const [apiRequest, setApiRequest] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [lastWeekClicks, setLastWeekClicks] = useState<any[]>([]);
  const [linkLastWeekClicks, setLinkLastWeekClicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboardData() {
      try {
        const [
          perHourClicksRes,
          apiRequestRes,
          userAnalyticsRes,
          tableDataRes,
          lastWeekClicksRes,
        ] = await Promise.all([
          apiService.getDashboardPerHourClicks(),
          apiService.getDashboardApiRequest(),
          apiService.getUserAnalytics(),
          apiService.getUserLinks(),
          apiService.getLastWeekClicks(),
        ]);

        if (perHourClicksRes.data) setPerHourClicks(perHourClicksRes.data);

        if (apiRequestRes.data) setApiRequest(apiRequestRes.data);

        if (tableDataRes.data) setTableData(tableDataRes.data);

        if (userAnalyticsRes.data) setUserAnalytics(userAnalyticsRes.data);
        if (lastWeekClicksRes.data) setLastWeekClicks(lastWeekClicksRes.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    getDashboardData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <StatsCard
        userAnalytics={userAnalytics}
        perHourClicks={perHourClicks}
        apiRequest={apiRequest}
        lastWeekClicks={lastWeekClicks}
      />

      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Clicks (Last 24 Hours)</h2>
        <DashboardChart data={perHourClicks} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Links</h2>
          <AddLinkDialog />
        </div>

        <LinkTable data={tableData} />
      </div>
    </div>
  );
}
