import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartComponentProps {
  onLoadComplete?: () => void;
}

export function ChartComponent({ onLoadComplete }: ChartComponentProps) {
  useEffect(() => {
    onLoadComplete?.();
  }, [onLoadComplete]);

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"][i],
    value: Math.floor(Math.random() * 100) + 20
  }));

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart Component geladen</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Lazy geladenes Chart mit simulierten Daten.
        </p>
        <div className="flex items-end space-x-2 h-40">
          {chartData.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div
                  className="w-full rounded-t bg-primary hover:bg-primary/80 transition-colors flex items-end justify-center relative"
                  style={{
                    height: `${height}%`,
                    minHeight: "4px",
                  }}
                >
                  <span className="absolute -top-6 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded px-1">
                    {item.value}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground mt-2 text-center">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
