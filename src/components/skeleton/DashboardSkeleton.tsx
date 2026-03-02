import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";
import TableSkeleton from "./TableSkeleton";
function KpiCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50 bg-card shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-11 w-11 rounded-lg" />
      </CardContent>
    </Card>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-card border rounded-xl p-6">
      <Skeleton className="h-5 w-44 mb-4" />
      <div className="min-h-[250px] w-full flex items-end gap-2 pt-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ height: `${Math.random() * 60 + 30}%` }}
          />
        ))}
      </div>
    </div>
  );
}



export default function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-8 flex flex-col animate-in fade-in duration-500">
      {/* Welcome header */}
      <div className="mb-2">
        <Skeleton className="h-8 w-72 mb-2" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCardSkeleton />
        <KpiCardSkeleton />
        <KpiCardSkeleton />
        <KpiCardSkeleton />
      </div>

      {/* Chart */}
      <ChartSkeleton />

      {/* Links Table */}
      <TableSkeleton />
    </div>
  );
}
