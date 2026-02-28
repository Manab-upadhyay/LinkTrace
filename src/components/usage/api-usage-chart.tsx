"use client";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, CartesianGrid, Tooltip } from "recharts";

const chartConfig = {
  totalRequests: {
    label: "Total Requests",
    color: "#2563eb",
  },
  errorCount: {
    label: "Errors",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export function ApiUsageChart({ data }: any) {
  const normalizedData =
    data?.map((item: any) => ({
      hour: `${item.hour}:00`,
      totalRequests: item.totalRequests,
      errorCount: item.errorCount,
    })) ?? [];

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={normalizedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <Tooltip />

        <Bar
          dataKey="totalRequests"
          fill="var(--color-totalRequests)"
          radius={4}
        />

        <Bar dataKey="errorCount" fill="var(--color-errorCount)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
