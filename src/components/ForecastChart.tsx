import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const forecastData = [
  { time: "Now", actual: 45, predicted: 45 },
  { time: "+1h", actual: null, predicted: 52 },
  { time: "+2h", actual: null, predicted: 61 },
  { time: "+3h", actual: null, predicted: 73 },
  { time: "+4h", actual: null, predicted: 85 },
  { time: "+5h", actual: null, predicted: 78 },
  { time: "+6h", actual: null, predicted: 65 },
];

export function ForecastChart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">SLA Breach Probability Forecast</h3>
          <p className="text-sm text-muted-foreground">Predicted breach likelihood over next 6 hours</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Predicted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Warning Zone</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 8%)',
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '8px',
                color: 'hsl(210, 40%, 98%)',
              }}
              formatter={(value: number) => [`${value}%`, 'Breach Probability']}
            />
            {/* Warning threshold line */}
            <Area
              type="monotone"
              dataKey={() => 60}
              stroke="hsl(38, 92%, 50%)"
              strokeDasharray="5 5"
              strokeWidth={1}
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="hsl(187, 100%, 50%)"
              strokeWidth={2}
              fill="url(#colorPredicted)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
