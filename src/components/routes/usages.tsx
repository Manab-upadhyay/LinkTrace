import LinkUsage from "../usage/Usage";
import { ApiUsageChart } from "../usage/api-usage-chart";
export default function UsagePage() {
  return (
    <>
      <div className="space-y-8">
        <LinkUsage></LinkUsage>
        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            API Requests (Last 24 Hours)
          </h2>
          <ApiUsageChart />
        </div>
      </div>
    </>
  );
}
