import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface WorkItem {
  id: string;
  name: string;
  queue: string;
  cases: number;
  avgTime: number;
  risk: "low" | "medium" | "high";
}

const mockData: WorkItem[] = [
  { id: "1", name: "Intake Processing", queue: "Intake", cases: 247, avgTime: 12, risk: "low" },
  { id: "2", name: "Document Review", queue: "Review", cases: 156, avgTime: 35, risk: "medium" },
  { id: "3", name: "Compliance Check", queue: "Compliance", cases: 89, avgTime: 28, risk: "low" },
  { id: "4", name: "Final Approval", queue: "Approval", cases: 342, avgTime: 45, risk: "high" },
  { id: "5", name: "Client Response", queue: "Response", cases: 67, avgTime: 18, risk: "low" },
];

export function WorkInProgress() {
  const riskStyles = {
    low: { bg: "bg-success/10", text: "text-success", icon: CheckCircle },
    medium: { bg: "bg-warning/10", text: "text-warning", icon: Clock },
    high: { bg: "bg-danger/10", text: "text-danger", icon: AlertTriangle },
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Work in Progress</h3>
      <div className="space-y-3">
        {mockData.map((item, index) => {
          const RiskIcon = riskStyles[item.risk].icon;
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50",
                "transition-all duration-300 hover:bg-secondary/50 hover:border-border",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-2 rounded-lg", riskStyles[item.risk].bg)}>
                  <RiskIcon className={cn("w-4 h-4", riskStyles[item.risk].text)} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.queue} Queue</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-mono text-lg font-semibold">{item.cases}</p>
                  <p className="text-xs text-muted-foreground">cases</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-semibold">{item.avgTime}m</p>
                  <p className="text-xs text-muted-foreground">avg time</p>
                </div>
                <div className={cn("px-3 py-1 rounded-full text-xs font-medium", riskStyles[item.risk].bg, riskStyles[item.risk].text)}>
                  {item.risk.toUpperCase()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
