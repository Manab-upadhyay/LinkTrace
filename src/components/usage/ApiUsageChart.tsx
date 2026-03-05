"use client";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, CartesianGrid, Tooltip } from "recharts";
import { BarChart3 } from "lucide-react";

const chartConfig = {
  total: {
    label: "Total Requests",
    color: "#2563eb",
  },
  errorCount: {
    label: "Errors",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export function ApiUsageChart({ data }: any) {
  
console.log("data>>", data);
      const isEmpty = !data || data.length === 0 || data.every((d: any) => d.total === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[250px] text-muted-foreground gap-3">
        <BarChart3 className="h-10 w-10 opacity-40" />
        <div className="text-center space-y-1">
          <p className="font-medium text-foreground">No API request data yet</p>
          <p className="text-sm">Make an API request to start seeing analytics here.</p>
        </div>
      </div>
    );
  }
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <Tooltip />

        <Bar
          dataKey="total"
          fill="var(--color-total)"
          radius={4}
        />

        <Bar dataKey="errorCount" fill="var(--color-errorCount)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
