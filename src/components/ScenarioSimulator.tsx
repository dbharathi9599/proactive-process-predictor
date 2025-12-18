import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, PlayCircle, RotateCcw, Users } from "lucide-react";

interface TeamAllocation {
  name: string;
  current: number;
  simulated: number;
  max: number;
}

const initialTeams: TeamAllocation[] = [
  { name: "Intake", current: 12, simulated: 12, max: 20 },
  { name: "Review", current: 8, simulated: 8, max: 15 },
  { name: "Compliance", current: 6, simulated: 6, max: 12 },
  { name: "Approval", current: 5, simulated: 5, max: 10 },
];

export function ScenarioSimulator() {
  const [teams, setTeams] = useState(initialTeams);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<null | { message: string; improvement: number }>(null);

  const handleSliderChange = (index: number, value: number[]) => {
    const newTeams = [...teams];
    newTeams[index].simulated = value[0];
    setTeams(newTeams);
    setResult(null);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const totalChange = teams.reduce((acc, t) => acc + (t.simulated - t.current), 0);
      const reviewIncrease = teams[1].simulated - teams[1].current;
      const improvement = reviewIncrease > 0 ? reviewIncrease * 8 + Math.random() * 10 : totalChange * 2;
      
      setResult({
        message: reviewIncrease > 0 
          ? `Moving ${reviewIncrease} employees to Review will reduce backlog by ${improvement.toFixed(0)}% and clear the bottleneck in ~2.5 hours`
          : `Current allocation change shows ${improvement > 0 ? "positive" : "negative"} impact on throughput`,
        improvement: improvement,
      });
      setIsSimulating(false);
    }, 1500);
  };

  const resetSimulation = () => {
    setTeams(initialTeams);
    setResult(null);
  };

  const totalEmployees = teams.reduce((acc, t) => acc + t.current, 0);
  const simulatedTotal = teams.reduce((acc, t) => acc + t.simulated, 0);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">What-If Scenario Planner</h3>
          <p className="text-sm text-muted-foreground">Test resource allocation changes</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono text-sm">
            {simulatedTotal}/{totalEmployees} employees
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {teams.map((team, index) => (
          <div key={team.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{team.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{team.current}</span>
                <ArrowRight className="w-3 h-3 text-primary" />
                <span className={cn(
                  "font-mono text-sm font-semibold",
                  team.simulated > team.current && "text-success",
                  team.simulated < team.current && "text-danger"
                )}>
                  {team.simulated}
                </span>
              </div>
            </div>
            <Slider
              value={[team.simulated]}
              max={team.max}
              min={0}
              step={1}
              onValueChange={(value) => handleSliderChange(index, value)}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={runSimulation}
          disabled={isSimulating}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PlayCircle className="w-4 h-4 mr-2" />
          {isSimulating ? "Simulating..." : "Run Simulation"}
        </Button>
        <Button
          variant="outline"
          onClick={resetSimulation}
          className="border-border hover:bg-secondary"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {result && (
        <div className={cn(
          "mt-4 p-4 rounded-lg border animate-scale-in",
          result.improvement > 0 
            ? "bg-success/10 border-success/30 text-success" 
            : "bg-warning/10 border-warning/30 text-warning"
        )}>
          <p className="text-sm font-medium">{result.message}</p>
        </div>
      )}
    </div>
  );
}
