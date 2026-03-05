import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";

interface LinksUsageCardProps {
  used: number;
  limit: number;
}

export function ApiUsageCard({ used, limit }: LinksUsageCardProps) {
  const percentage = Math.min((used / limit) * 100, 100);
  const remaining = Math.max(limit - used, 0);

  return (
    <Card className="border-muted/40 bg-muted/20 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">APi Usage</CardTitle>
          <CardDescription>Monthly API request limit</CardDescription>
        </div>

        <div className="p-2 rounded-lg bg-background border">
          <BarChart className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Numbers */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">
              {used}
              <span className="text-base font-medium text-muted-foreground">
                {" "}
                / {limit}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              {remaining} remaining
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            {percentage.toFixed(0)}%
          </div>
        </div>

        {/* Progress */}
        <Progress value={percentage} className="h-2" />

        {/* Subtle Footer Note */}
        <p className="text-xs text-muted-foreground">
          Usage resets automatically at the start of each month.
        </p>
      </CardContent>
    </Card>
  );
}
