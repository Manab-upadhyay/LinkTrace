import StatsCard from "../dashboard/kpi-card";
import { DashboardChart } from "../dashboard/LinkStatchart";
import LinkTable from "../dashboard/links/link";
import { AddLinkDialog } from "../dashboard/links/adddialog";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* KPI Section */}
      <StatsCard />

      {/* Chart Section */}
      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Clicks (Last 24 Hours)</h2>
        <DashboardChart />
      </div>

      {/* Links Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Links</h2>
          <AddLinkDialog />
        </div>

        <LinkTable />
      </div>
    </div>
  );
}
