"use client";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from "recharts";

const chartData = [
  { hour: "00:00", clicks: 12 },
  { hour: "01:00", clicks: 5 },
  { hour: "02:00", clicks: 9 },
  { hour: "03:00", clicks: 4 },
  { hour: "04:00", clicks: 7 },
];

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function DashboardChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <LineChart data={chartData}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="clicks"
          stroke="var(--color-clicks)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
