import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "safe" | "warning" | "danger";
  className?: string;
}

export function MetricCard({ label, value, icon: Icon, trend, status = "safe", className }: MetricCardProps) {
  const statusStyles = {
    safe: "border-success/30 hover:border-success/50",
    warning: "border-warning/30 hover:border-warning/50",
    danger: "border-danger/30 hover:border-danger/50",
  };

  const iconStyles = {
    safe: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  };

  const pulseStyles = {
    safe: "",
    warning: "pulse-warning",
    danger: "pulse-danger",
  };

  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300",
        statusStyles[status],
        pulseStyles[status],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="metric-label">{label}</p>
          <p className="metric-value">{value}</p>
          {trend && (
            <p className={cn("text-sm font-medium", trend.isPositive ? "text-success" : "text-danger")}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-lg bg-secondary/50", iconStyles[status])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
