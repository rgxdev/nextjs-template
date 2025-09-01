import { ResponsiveTester } from "@/components/examples/ResponsiveTester";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Monitor, 
  Smartphone, 
  Tablet,
  RotateCcw,
  ZoomIn,
  Code,
  ArrowLeft
} from "lucide-react";

export default function ResponsiveTestPage() {
  const features = [
    {
      icon: Monitor,
      title: "Multi-Device Preview",
      description: "Teste deine Website auf Desktop, Tablet und Mobile Geräten"
    },
    {
      icon: RotateCcw,
      title: "Orientation Switch",
      description: "Wechsle zwischen Portrait und Landscape Modus"
    },
    {
      icon: ZoomIn,
      title: "Zoom Controls",
      description: "Flexibler Zoom für detaillierte Ansichten"
    },
    {
      icon: Code,
      title: "CSS Code Generation",
      description: "Generiere Media Queries für responsive Breakpoints"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={"/examples" as any}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zu Beispielen
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Responsive Design Tester
            </h1>
            <p className="text-muted-foreground">
              Teste und optimiere deine Website für verschiedene Bildschirmgrößen
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <ResponsiveTester />

        <Card>
          <CardHeader>
            <CardTitle>Responsive Design Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">📱 Mobile First Design</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Beginne das Design mit der kleinsten Bildschirmgröße</li>
                  <li>• Verwende progressive Enhancement für größere Screens</li>
                  <li>• Optimiere Touch-Interaktionen für mobile Geräte</li>
                  <li>• Berücksichtige Thumb-Zones für Navigation</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">💻 Breakpoint Strategy</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• sm: 640px - Kleine Tablets im Portrait-Modus</li>
                  <li>• md: 768px - Tablets und kleine Laptops</li>
                  <li>• lg: 1024px - Laptops und kleinere Desktops</li>
                  <li>• xl: 1280px - Große Desktop-Monitore</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">🎨 Layout Patterns</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Grid-Systeme mit flexiblen Spalten</li>
                  <li>• Stapelbare Komponenten für mobile Ansicht</li>
                  <li>• Adaptive Navigation (Hamburger Menu)</li>
                  <li>• Responsive Typography und Spacing</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">⚡ Performance</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Lazy Loading für Bilder und Komponenten</li>
                  <li>• Optimierte Bildgrößen für verschiedene DPIs</li>
                  <li>• CSS-Only Animationen bevorzugen</li>
                  <li>• Minimiere Reflows und Repaints</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Tailwind CSS Responsive Utilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Container & Spacing</h4>
                  <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`<!-- Responsive Container -->
<div class="container mx-auto px-4 md:px-6 lg:px-8">

<!-- Responsive Padding -->
<div class="p-2 md:p-4 lg:p-6 xl:p-8">

<!-- Responsive Margins -->
<div class="mt-4 md:mt-6 lg:mt-8">`}
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Grid & Flexbox</h4>
                  <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- Responsive Flex -->
<div class="flex flex-col md:flex-row">

<!-- Responsive Gap -->
<div class="space-y-4 md:space-y-0 md:space-x-4">`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Common Responsive Patterns</h4>
                <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`<!-- Card Grid (1 -> 2 -> 3 -> 4 columns) -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

<!-- Hero Section (stack -> side-by-side) -->
<div class="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">

<!-- Navigation (mobile hamburger -> desktop menu) -->
<nav class="hidden md:flex space-x-6">
<button class="md:hidden">Menu</button>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
