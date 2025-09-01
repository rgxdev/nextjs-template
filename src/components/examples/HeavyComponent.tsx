import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeavyComponentProps {
  onLoadComplete?: () => void;
}

export function HeavyComponent({ onLoadComplete }: HeavyComponentProps) {
  useEffect(() => {
    // Simulate heavy computation
    const start = Date.now();
    
    // Simulate some heavy work
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    
    const end = Date.now();
    console.log(`Heavy computation took ${end - start}ms`);
    
    onLoadComplete?.();
  }, [onLoadComplete]);

  // Generate some heavy content
  const heavyData = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    value: Math.random() * 1000,
    label: `Item ${i + 1}`,
    description: `Heavy computational result for item ${i + 1}`
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heavy Component geladen</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Diese Komponente wurde lazy geladen und führt schwere Berechnungen durch.
        </p>
        <div className="max-h-32 overflow-y-auto">
          {heavyData.slice(0, 10).map((item) => (
            <div key={item.id} className="p-2 border-b border-border">
              <div className="font-medium">{item.label}</div>
              <div className="text-sm text-muted-foreground">
                Wert: {item.value.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Zeigt 10 von {heavyData.length} generierten Items
        </p>
      </CardContent>
    </Card>
  );
}
