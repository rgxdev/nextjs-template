import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Table2, 
  BarChart3, 
  Bell, 
  FormInput,
  Database,
  Shield,
  Zap,
  Layout,
  ChevronRight,
  Monitor
} from "lucide-react";

export default function ExamplesPage() {
  const examples = [
    {
      title: "Advanced Tables",
      description: "Komplexe Datentabellen mit Sortierung, Filterung, Pagination und Export-Funktionen",
      icon: Table2,
      href: "/examples/table",
      category: "TanStack Table",
      features: ["Multi-column Sorting", "Global & Column Filtering", "Row Selection", "CSV Export"]
    },
    {
      title: "Data Visualization", 
      description: "Interaktive Charts und Datenvisualisierung ohne externe Dependencies",
      icon: BarChart3,
      href: "/examples/visualization",
      category: "Charts & Metrics",
      features: ["Bar Charts", "Line Charts", "Metric Cards", "Responsive Design"]
    },
    {
      title: "Notification Center",
      description: "Umfassendes Benachrichtigungssystem mit verschiedenen Typen und Verwaltung",
      icon: Bell,
      href: "/examples/notifications", 
      category: "UI Components",
      features: ["Real-time Updates", "Type Variants", "Sound Settings", "Batch Actions"]
    },
    {
      title: "Responsive Design Tester",
      description: "Teste deine Website auf verschiedenen Geräten und Bildschirmgrößen", 
      icon: Monitor,
      href: "/examples/responsive",
      category: "Development Tools",
      features: ["Device Presets", "Orientation Switch", "Zoom Controls", "CSS Generation"]
    },
    {
      title: "Advanced Forms",
      description: "TanStack Form mit Zod-Validation, Multi-Step Forms und komplexen Validierungen", 
      icon: FormInput,
      href: "/examples/form",
      category: "TanStack Form",
      features: ["Schema Validation", "Multi-Step", "Field Arrays", "Error Handling"]
    },
    {
      title: "Query Examples",
      description: "TanStack Query Implementierungen mit Caching, Mutations und Error Handling",
      icon: Database,
      href: "/examples/query",
      category: "TanStack Query", 
      features: ["Data Fetching", "Optimistic Updates", "Infinite Queries", "Background Sync"]
    }
  ];

  const categories = Array.from(new Set(examples.map(example => example.category)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Examples & Demos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Umfassende Beispiele und Implementierungen für moderne React-Entwicklung 
            mit TanStack, TypeScript und Next.js
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => {
            const Icon = example.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {example.title}
                        </CardTitle>
                        <div className="text-xs text-muted-foreground font-medium">
                          {example.category}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {example.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Key Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {example.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link href={example.href as any} prefetch={false}>
                      Example ansehen
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/30 transition-colors">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <CardTitle>Type Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Vollständige TypeScript-Integration mit strikten Typen 
                und Zod-Schema-Validierung für maximale Typsicherheit.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/30 transition-colors">
            <CardHeader className="text-center">
              <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Optimierte Komponenten mit React.memo, useMemo und 
                effizienten Rendering-Strategien für beste Performance.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/30 transition-colors">
            <CardHeader className="text-center">
              <Layout className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <CardTitle>Accessibility</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                WCAG-konforme Komponenten mit Keyboard-Navigation,
                Screen-Reader-Support und semantischem HTML.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">Technologie-Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="font-semibold">Frontend</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Next.js 15.2.1</div>
                  <div>React 18.3.1</div>
                  <div>TypeScript 5.6.3</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">TanStack</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Query 5.61.0</div>
                  <div>Table 8.20.5</div>
                  <div>Form 0.42.1</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Styling</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Tailwind CSS</div>
                  <div>shadcn/ui</div>
                  <div>Lucide Icons</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Validation</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Zod 4.1.5</div>
                  <div>Type Safety</div>
                  <div>Runtime Checks</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
