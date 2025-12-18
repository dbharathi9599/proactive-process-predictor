import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  message: string;
  severity: "warning" | "danger";
  time: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    message: "85% probability of backlog forming in Approval queue within 4 hours",
    severity: "danger",
    time: "2 min ago",
  },
  {
    id: "2",
    message: "Document Review processing time trending 15% above baseline",
    severity: "warning",
    time: "8 min ago",
  },
];

export function AlertBanner() {
  const [visibleAlerts, setVisibleAlerts] = useState(alerts);

  const dismissAlert = (id: string) => {
    setVisibleAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
      {visibleAlerts.map((alert, index) => (
        <div
          key={alert.id}
          className={cn(
            "flex items-center justify-between p-4 rounded-lg border animate-slide-in-right",
            alert.severity === "danger" 
              ? "bg-danger/10 border-danger/30" 
              : "bg-warning/10 border-warning/30"
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className={cn(
              "w-5 h-5",
              alert.severity === "danger" ? "text-danger" : "text-warning"
            )} />
            <div>
              <p className={cn(
                "text-sm font-medium",
                alert.severity === "danger" ? "text-danger" : "text-warning"
              )}>
                {alert.message}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
            </div>
          </div>
          <button
            onClick={() => dismissAlert(alert.id)}
            className="p-1 rounded hover:bg-secondary/50 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ))}
    </div>
  );
}
