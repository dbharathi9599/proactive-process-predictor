import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SLAGaugeProps {
  probability: number;
  label: string;
  timeframe: string;
}

export function SLAGauge({ probability, label, timeframe }: SLAGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(probability), 100);
    return () => clearTimeout(timer);
  }, [probability]);

  const getStatus = (value: number) => {
    if (value <= 30) return "safe";
    if (value <= 60) return "warning";
    return "danger";
  };

  const status = getStatus(probability);

  const statusColors = {
    safe: "stroke-success",
    warning: "stroke-warning",
    danger: "stroke-danger",
  };

  const statusBg = {
    safe: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="glass-card p-6 flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-secondary"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className={cn(statusColors[status], "transition-all duration-1000 ease-out")}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-3xl font-bold font-mono", statusBg[status])}>
            {animatedValue}%
          </span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{timeframe}</p>
      </div>
    </div>
  );
}
