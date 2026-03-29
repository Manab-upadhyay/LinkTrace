import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart } from "lucide-react";

interface LinksUsageCardProps {
  used: number;
  limit: number;
}

export function ApiUsageCard({ used, limit }: LinksUsageCardProps) {
  const percentage = Math.min((used / limit) * 100, 100);
  const remaining = Math.max(limit - used, 0);

  return (
    <Card className="border border-border/50 bg-card shadow-sm rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-muted-foreground">API Usage</CardTitle>
          <CardDescription className="text-xs text-muted-foreground/60">Monthly API request limit</CardDescription>
        </div>
        <div className="p-2 rounded-lg bg-primary/5 text-primary border border-primary/10">
          <BarChart className="w-4 h-4" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight text-foreground">{used}</span>
            <span className="text-sm font-medium text-muted-foreground">/ {limit}</span>
          </div>
          <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {percentage.toFixed(0)}%
          </span>
        </div>

        <div className="space-y-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-medium text-muted-foreground/80">
            <span>{remaining} requests remaining</span>
            <span>Resets monthly</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
