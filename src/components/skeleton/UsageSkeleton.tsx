import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

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
export default function UsageSkeleton(){
    return (
        <>
        <KpiCardSkeleton></KpiCardSkeleton>
        <ChartSkeleton></ChartSkeleton>
        </>
    )
}