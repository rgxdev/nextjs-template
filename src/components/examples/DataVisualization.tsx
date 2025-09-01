"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Activity, DollarSign, ShoppingCart } from "lucide-react";

interface MetricData {
  readonly label: string;
  readonly value: number;
  readonly change: number;
  readonly trend: "up" | "down";
  readonly icon: React.ComponentType<{ className?: string }>;
}

interface ChartData {
  readonly month: string;
  readonly users: number;
  readonly revenue: number;
  readonly orders: number;
}

const generateChartData = (): ChartData[] => {
  const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  return months.map((month, index) => ({
    month,
    users: Math.floor(Math.random() * 1000) + 500,
    revenue: Math.floor(Math.random() * 50000) + 10000,
    orders: Math.floor(Math.random() * 200) + 50,
  }));
};

const metrics: MetricData[] = [
  {
    label: "Gesamtbenutzer",
    value: 8542,
    change: 12.5,
    trend: "up",
    icon: Users,
  },
  {
    label: "Umsatz",
    value: 45389,
    change: -2.3,
    trend: "down",
    icon: DollarSign,
  },
  {
    label: "Bestellungen",
    value: 1247,
    change: 8.1,
    trend: "up",
    icon: ShoppingCart,
  },
  {
    label: "Aktivität",
    value: 73.2,
    change: 5.4,
    trend: "up",
    icon: Activity,
  },
];

function SimpleBarChart({ data, dataKey, color = "#3b82f6" }: {
  readonly data: ChartData[];
  readonly dataKey: keyof ChartData;
  readonly color?: string;
}) {
  const maxValue = Math.max(...data.map(item => item[dataKey] as number));
  
  return (
    <div className="flex items-end space-x-2 h-40">
      {data.map((item, index) => {
        const value = item[dataKey] as number;
        const height = (value / maxValue) * 100;
        
        return (
          <div key={index} className="flex flex-col items-center flex-1 group">
            <div
              className="w-full rounded-t transition-all duration-300 hover:opacity-80 flex items-end justify-center relative"
              style={{
                height: `${height}%`,
                backgroundColor: color,
                minHeight: "4px",
              }}
            >
              <span className="absolute -top-6 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded px-1">
                {typeof value === "number" ? value.toLocaleString() : value}
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-2 text-center">
              {item.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SimpleLineChart({ data, dataKey, color = "#10b981" }: {
  readonly data: ChartData[];
  readonly dataKey: keyof ChartData;
  readonly color?: string;
}) {
  const maxValue = Math.max(...data.map(item => item[dataKey] as number));
  const minValue = Math.min(...data.map(item => item[dataKey] as number));
  const range = maxValue - minValue;
  
  const points = data.map((item, index) => {
    const value = item[dataKey] as number;
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative h-40 w-full">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className="drop-shadow-sm"
        />
        {data.map((item, index) => {
          const value = item[dataKey] as number;
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((value - minValue) / range) * 100;
          
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              className="hover:r-3 transition-all cursor-pointer"
            >
              <title>{`${item.month}: ${typeof value === "number" ? value.toLocaleString() : value}`}</title>
            </circle>
          );
        })}
      </svg>
      
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        {data.map((item, index) => (
          <span key={index} className={index % 2 === 0 ? "" : "opacity-0"}>
            {item.month}
          </span>
        ))}
      </div>
    </div>
  );
}

type ChartMetric = "users" | "revenue" | "orders";

export function DataVisualization() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [selectedMetric, setSelectedMetric] = useState<ChartMetric>("users");
  const chartData = useMemo(() => generateChartData(), []);

  const chartColors: Record<ChartMetric, string> = {
    users: "#3b82f6",
    revenue: "#10b981",
    orders: "#f59e0b",
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.label.includes("Umsatz") 
                    ? `€${metric.value.toLocaleString()}`
                    : metric.label.includes("Aktivität")
                    ? `${metric.value}%`
                    : metric.value.toLocaleString()
                  }
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {metric.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {metric.change > 0 ? "+" : ""}{metric.change}%
                  </span>
                  <span className="ml-1">gegenüber letztem Monat</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Datenvisualisierung</CardTitle>
              <CardDescription>
                Interaktive Charts mit verschiedenen Metriken und Darstellungsformen
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedMetric} onValueChange={(value: string) => setSelectedMetric(value as ChartMetric)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">Benutzer</SelectItem>
                  <SelectItem value="revenue">Umsatz</SelectItem>
                  <SelectItem value="orders">Bestellungen</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={chartType} onValueChange={(value: string) => setChartType(value as "bar" | "line")}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Balken</SelectItem>
                  <SelectItem value="line">Linie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                {selectedMetric === "users" ? "Benutzer" : 
                 selectedMetric === "revenue" ? "Umsatz" :
                 "Bestellungen"}
              </Badge>
              <Badge variant="outline">
                {chartType === "bar" ? "Balkendiagramm" : "Liniendiagramm"}
              </Badge>
            </div>
            
            {chartType === "bar" ? (
              <SimpleBarChart 
                data={chartData} 
                dataKey={selectedMetric}
                color={chartColors[selectedMetric]}
              />
            ) : (
              <SimpleLineChart 
                data={chartData} 
                dataKey={selectedMetric}
                color={chartColors[selectedMetric]}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Datenübersicht</CardTitle>
          <CardDescription>
            Tabellarische Darstellung der Chart-Daten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Monat
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Benutzer
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Umsatz
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Bestellungen
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {chartData.map((row, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{row.month}</td>
                    <td className="p-4 align-middle">{row.users.toLocaleString()}</td>
                    <td className="p-4 align-middle">€{row.revenue.toLocaleString()}</td>
                    <td className="p-4 align-middle">{row.orders.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
