import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendColor?: "green" | "red" | "muted";
}

export function KpiCard({
  title,
  value,
  icon: Icon,
  trend,
  trendColor,
}: KpiCardProps) {
  const isPositive =
    trendColor === "green" || trend?.startsWith("+") || trend?.startsWith("↑");
  const isNegative =
    trendColor === "red" || trend?.startsWith("-") || trend?.startsWith("↓");

  return (
    <Card className="relative overflow-hidden border border-border/50 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-border/80 rounded-xl">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-primary/5 text-primary border border-primary/10">
              <Icon className="h-5 w-5" />
            </div>
            
            {trend && (
              <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isPositive 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                  : isNegative 
                    ? "bg-red-500/10 text-red-600 dark:text-red-400" 
                    : "bg-muted text-muted-foreground"
              }`}>
                {isPositive && <TrendingUp className="h-3 w-3" />}
                {isNegative && <TrendingDown className="h-3 w-3" />}
                <span>{trend}</span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
