import { Activity, Clock, FileText, TrendingUp, Users, Zap } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { SLAGauge } from "@/components/SLAGauge";
import { WorkInProgress } from "@/components/WorkInProgress";
import { ScenarioSimulator } from "@/components/ScenarioSimulator";
import { ForecastChart } from "@/components/ForecastChart";
import { AlertBanner } from "@/components/AlertBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Operations Command Center</h1>
                <p className="text-sm text-muted-foreground">Predictive Process Simulation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium text-success">Live</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Last updated</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 space-y-6">
        {/* Alerts */}
        <AlertBanner />

        {/* Key Metrics */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Active Cases"
              value="1,247"
              icon={FileText}
              trend={{ value: 12, isPositive: false }}
              status="warning"
            />
            <MetricCard
              label="Processing Rate"
              value="89/hr"
              icon={TrendingUp}
              trend={{ value: 5, isPositive: true }}
              status="safe"
            />
            <MetricCard
              label="Avg. Cycle Time"
              value="24.5m"
              icon={Clock}
              trend={{ value: 8, isPositive: false }}
              status="warning"
            />
            <MetricCard
              label="Staff Online"
              value="31"
              icon={Users}
              status="safe"
            />
          </div>
        </section>

        {/* SLA Breach Probabilities */}
        <section>
          <h2 className="text-lg font-semibold mb-4">SLA Breach Probability</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SLAGauge probability={23} label="Intake Queue" timeframe="Next 2 hours" />
            <SLAGauge probability={45} label="Review Queue" timeframe="Next 2 hours" />
            <SLAGauge probability={85} label="Approval Queue" timeframe="Next 4 hours" />
            <SLAGauge probability={12} label="Response Queue" timeframe="Next 2 hours" />
          </div>
        </section>

        {/* Forecast Chart */}
        <ForecastChart />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Work in Progress */}
          <WorkInProgress />
          
          {/* Scenario Simulator */}
          <ScenarioSimulator />
        </div>
      </main>
    </div>
  );
};

export default Index;
