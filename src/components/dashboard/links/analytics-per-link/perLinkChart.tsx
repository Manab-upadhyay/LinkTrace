"use client";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from "recharts";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function ChartPerLink({ data }: any) {
  console.log("Chart Data:", data);
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <LineChart data={data.data}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total"
          stroke="var(--color-clicks)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
