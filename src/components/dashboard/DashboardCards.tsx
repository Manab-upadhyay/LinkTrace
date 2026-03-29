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
    <Card className="glass glass-hover relative overflow-hidden group transition-all duration-500 border-white/5 shadow-2xl">
      {/* Bioluminescent Background Glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#00f5a0]/5 blur-3xl group-hover:bg-[#00f5a0]/15 transition-all duration-700" />
      
      <CardContent className="flex items-center gap-5 p-6 relative z-10">
        <div className="flex-1 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            {title}
          </p>
          <div className="flex flex-col">
            <p className="text-3xl font-black tracking-tighter text-black group-hover:scale-[1.02] origin-left transition-transform duration-500">
              {value}
            </p>
            
            {trend && (
              <div className="flex items-center gap-1.5 mt-1">
                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${
                  isPositive 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : isNegative 
                      ? "bg-red-500/10 text-red-400 border-red-500/20" 
                      : "bg-white/5 text-white/40 border-white/10"
                }`}>
                  {isPositive && <TrendingUp className="h-3 w-3" />}
                  {isNegative && <TrendingDown className="h-3 w-3" />}
                  <span>{trend}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          {/* Animated Glow behind icon */}
          <div className="absolute inset-0 bg-[#00f5a0]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 animate-pulse-slow transition-opacity duration-700" />
          
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-[#00f5a0] shadow-inner relative z-10 group-hover:rotate-[10deg] group-hover:scale-110 transition-all duration-500">
            <Icon className="h-6 w-6 glow-emerald" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
