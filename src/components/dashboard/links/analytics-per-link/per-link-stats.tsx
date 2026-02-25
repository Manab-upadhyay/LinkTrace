import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

export function KpiCard({ title, value, icon: Icon, trend }: KpiCardProps) {
  const isPositive = trend?.startsWith("+") || trend?.startsWith("↑");
  const isNegative = trend?.startsWith("-") || trend?.startsWith("↓");

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-border">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex-1 space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold tracking-tight text-card-foreground">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1">
              {isPositive && (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              )}
              {isNegative && (
                <TrendingDown className="h-3.5 w-3.5 text-destructive" />
              )}
              <span
                className={`text-xs font-medium ${
                  isPositive
                    ? "text-emerald-500"
                    : isNegative
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
