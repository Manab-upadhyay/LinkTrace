"use client";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import { BarChart3 } from "lucide-react";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function DashboardChart({ data }: any) {
  const isEmpty = !data || data.length === 0 || data.every((d: any) => d.total === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[250px] text-muted-foreground gap-3">
        <BarChart3 className="h-10 w-10 opacity-40" />
        <div className="text-center space-y-1">
          <p className="font-medium text-foreground">No click data yet</p>
          <p className="text-sm">Add a link and share it to start seeing analytics here.</p>
        </div>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <LineChart data={data}>
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
