import { ApiUsageChart } from "../usage/api-usage-chart";
import { LinksUsageCard } from "../usage/link-usage-card";
import { ApiUsageCard } from "../usage/api-usage-card";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/service/axiosClient";
import UsageSkeleton from "../skeleton/UsageSkeleton";
export default function UsagePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["usageData"],
    queryFn: () => apiClient.get("/usage/current").then((res) => res.data),
  });
  if (isLoading) {
    return <UsageSkeleton></UsageSkeleton>
  }

  return (
    <>
      <div className="space-y-8">
        <LinksUsageCard
          used={data.usage?.linksCreated}
          limit={100}
        ></LinksUsageCard>
        <ApiUsageCard used={data.usage.apiRequests} limit={500}></ApiUsageCard>
        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            API Requests (Last 24 Hours)
          </h2>
          <ApiUsageChart data={data.apiUsage} />
        </div>
      </div>
    </>
  );
}
