import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Activity
} from "lucide-react";

export default function VisualizationPage() {
  const features = [
    {
      icon: BarChart3,
      title: "Balkendiagramme",
      description: "Interaktive Balkendiagramme mit Hover-Effekten und Tooltips"
    },
    {
      icon: LineChart,
      title: "Liniendiagramme", 
      description: "Smooth Liniendiagramme für Trend-Visualisierung"
    },
    {
      icon: TrendingUp,
      title: "Trend-Analysen",
      description: "Automatische Trend-Erkennung mit visuellen Indikatoren"
    },
    {
      icon: PieChart,
      title: "Metric Cards",
      description: "Übersichtliche KPI-Darstellung mit Change-Indikatoren"
    }
  ];

  const metrics = [
    {
      icon: Users,
      label: "Benutzer",
      value: "8,542",
      change: "+12.5%",
      positive: true
    },
    {
      icon: DollarSign,
      label: "Umsatz",
      value: "€45,389",
      change: "-2.3%",
      positive: false
    },
    {
      icon: ShoppingCart,
      label: "Bestellungen", 
      value: "1,247",
      change: "+8.1%",
      positive: true
    },
    {
      icon: Activity,
      label: "Aktivität",
      value: "73.2%",
      change: "+5.4%",
      positive: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Datenvisualisierung
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Moderne Chart-Komponenten ohne externe Abhängigkeiten. 
            Lightweight, performant und vollständig anpassbar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Live Demo Metriken</span>
            </CardTitle>
            <CardDescription>
              Beispieldaten zur Demonstration der Visualisierungskomponenten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="text-center p-4 bg-background rounded-lg border">
                    <Icon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="font-semibold text-lg">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                    <div className={`text-xs font-medium ${
                      metric.positive ? "text-green-600" : "text-red-600"
                    }`}>
                      {metric.change}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link href="/examples/visualization/demo" prefetch={false}>
              Live Demo öffnen
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Interaktive Charts und Datenvisualisierung erleben
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Features & Vorteile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">✨ Keine externen Abhängigkeiten</h4>
                <p className="text-muted-foreground">
                  Alle Charts sind nativ mit SVG und CSS implementiert. 
                  Keine zusätzlichen Chart-Libraries erforderlich.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">🎨 Vollständig anpassbar</h4>
                <p className="text-muted-foreground">
                  Farben, Größen und Stile über Tailwind CSS und 
                  Komponenteneigenschaften steuerbar.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">⚡ Optimierte Performance</h4>
                <p className="text-muted-foreground">
                  Lightweight Implementierung mit React.memo und 
                  optimierten Rendering-Zyklen.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">📱 Responsive Design</h4>
                <p className="text-muted-foreground">
                  Automatische Anpassung an verschiedene Bildschirmgrößen 
                  und Touch-Interaktionen.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
