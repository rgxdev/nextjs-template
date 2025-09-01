"use client";

import { useState, lazy, Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Zap, 
  Image as ImageIcon, 
  Code, 
  Gauge,
  Timer,
  Package,
  FileText,
  AlertCircle
} from "lucide-react";

// Lazy loaded components to demonstrate code splitting
const LazyHeavyComponent = lazy(() => 
  import("./HeavyComponent").then(module => ({ default: module.HeavyComponent }))
);

const LazyChartComponent = lazy(() => 
  import("./ChartComponent").then(module => ({ default: module.ChartComponent }))
);

const LazyDataTableComponent = lazy(() => 
  import("./DataTableComponent").then(module => ({ default: module.DataTableComponent }))
);

interface PerformanceMetric {
  readonly name: string;
  readonly value: number;
  readonly unit: string;
  readonly target: number;
  readonly status: "good" | "warning" | "poor";
}

const performanceMetrics: PerformanceMetric[] = [
  { name: "First Contentful Paint", value: 1.2, unit: "s", target: 1.8, status: "good" },
  { name: "Largest Contentful Paint", value: 2.1, unit: "s", target: 2.5, status: "good" },
  { name: "Time to Interactive", value: 3.2, unit: "s", target: 3.8, status: "good" },
  { name: "Cumulative Layout Shift", value: 0.08, unit: "", target: 0.1, status: "good" },
  { name: "Total Blocking Time", value: 180, unit: "ms", target: 200, status: "good" },
  { name: "Bundle Size", value: 245, unit: "KB", target: 500, status: "good" },
];

const getStatusColor = (status: PerformanceMetric["status"]) => {
  switch (status) {
    case "good": return "text-green-600 bg-green-50 dark:bg-green-950/20";
    case "warning": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20";
    case "poor": return "text-red-600 bg-red-50 dark:bg-red-950/20";
  }
};

const getStatusBadge = (status: PerformanceMetric["status"]) => {
  switch (status) {
    case "good": return "default";
    case "warning": return "secondary";
    case "poor": return "destructive";
  }
};

export function PerformanceDemo() {
  const [activeDemo, setActiveDemo] = useState<"none" | "heavy" | "chart" | "table">("none");
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
  const [loadingDuration, setLoadingDuration] = useState<number | null>(null);

  const handleDemoLoad = (demoType: "heavy" | "chart" | "table") => {
    setLoadingStartTime(Date.now());
    setActiveDemo(demoType);
  };

  const handleLoadComplete = () => {
    if (loadingStartTime) {
      setLoadingDuration(Date.now() - loadingStartTime);
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gauge className="h-5 w-5" />
            <span>Performance Metriken</span>
          </CardTitle>
          <CardDescription>
            Aktuelle Performance-Kennzahlen der Anwendung
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${getStatusColor(metric.status)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{metric.name}</h4>
                  <Badge variant={getStatusBadge(metric.status)} className="text-xs">
                    {metric.status === "good" ? "Gut" : 
                     metric.status === "warning" ? "Warnung" : "Schlecht"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">
                    {metric.value}{metric.unit}
                  </div>
                  <div className="text-sm opacity-75">
                    Ziel: {metric.target}{metric.unit}
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-current h-2 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min((metric.target - metric.value) / metric.target * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Splitting Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Code-Splitting Demonstration</span>
          </CardTitle>
          <CardDescription>
            Lazy Loading von Komponenten zur Performance-Optimierung
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => handleDemoLoad("heavy")}
                variant={activeDemo === "heavy" ? "default" : "outline"}
                disabled={activeDemo !== "none" && activeDemo !== "heavy"}
              >
                <Package className="h-4 w-4 mr-2" />
                Heavy Component laden
              </Button>
              <Button 
                onClick={() => handleDemoLoad("chart")}
                variant={activeDemo === "chart" ? "default" : "outline"}
                disabled={activeDemo !== "none" && activeDemo !== "chart"}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Chart Component laden
              </Button>
              <Button 
                onClick={() => handleDemoLoad("table")}
                variant={activeDemo === "table" ? "default" : "outline"}
                disabled={activeDemo !== "none" && activeDemo !== "table"}
              >
                <FileText className="h-4 w-4 mr-2" />
                Data Table laden
              </Button>
              <Button 
                onClick={() => {
                  setActiveDemo("none");
                  setLoadingDuration(null);
                }}
                variant="outline"
                disabled={activeDemo === "none"}
              >
                Zurücksetzen
              </Button>
            </div>

            {loadingDuration && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <Timer className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800 dark:text-green-200">
                  Komponente in {loadingDuration}ms geladen
                </span>
              </div>
            )}

            <div className="min-h-[200px] border rounded-lg p-4">
              {activeDemo === "none" && (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Wählen Sie eine Komponente zum Laden aus</p>
                  </div>
                </div>
              )}

              {activeDemo === "heavy" && (
                <Suspense fallback={
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-8 w-48" />
                  </div>
                }>
                  <LazyHeavyComponent onLoadComplete={handleLoadComplete} />
                </Suspense>
              )}

              {activeDemo === "chart" && (
                <Suspense fallback={
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-64 w-full" />
                  </div>
                }>
                  <LazyChartComponent onLoadComplete={handleLoadComplete} />
                </Suspense>
              )}

              {activeDemo === "table" && (
                <Suspense fallback={
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-56" />
                    <div className="space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  </div>
                }>
                  <LazyDataTableComponent onLoadComplete={handleLoadComplete} />
                </Suspense>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Best Practices</CardTitle>
          <CardDescription>
            Implementierte Optimierungen in diesem Template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Frontend-Optimierungen</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Code-Splitting mit React.lazy()</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Tree-Shaking für kleinere Bundles</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Lazy Loading von Bildern</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Memoization mit React.memo</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Optimierte CSS mit Tailwind JIT</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Backend-Optimierungen</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Server-Side Rendering (SSR)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Static Site Generation (SSG)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">API Route Caching</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Incremental Static Regeneration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Edge Functions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                  Performance-Monitoring
                </h5>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Dieses Template integriert Web Vitals Monitoring und automatische Bundle-Analyse. 
                  Performance-Metriken werden in der Browser-Konsole ausgegeben.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
