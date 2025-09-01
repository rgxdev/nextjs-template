import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeSwitch from "@/components/core/default/ThemeSwitcher";
import Link from "next/link";
import { 
  Database, 
  FileText, 
  Table2, 
  BarChart3, 
  Bell, 
  Settings,
  Shield,
  Zap,
  Layout,
  ChevronRight,
  Github,
  ExternalLink,
  CheckCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "Next.js Template mit TanStack",
  description: "Production-ready Next.js Template mit TanStack Query, Form, Table und modernen Best Practices",
};

export default function Home() {
  const features = [
    {
      icon: Database,
      title: "TanStack Query",
      description: "Server State Management mit automatischem Caching",
      href: "/examples/query",
      features: ["Optimistic Updates", "Background Sync", "Error Retry"]
    },
    {
      icon: FileText,
      title: "TanStack Form",
      description: "Type-safe Formulare mit Zod-Validierung",
      href: "/examples/forms",
      features: ["Schema Validation", "Field Arrays", "Multi-Step"]
    },
    {
      icon: Table2,
      title: "TanStack Table",
      description: "Performante Datentabellen mit Virtualisierung",
      href: "/examples/tables",
      features: ["Sorting", "Filtering", "Pagination", "Export"]
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Charts ohne externe Dependencies",
      href: "/examples/visualization",
      features: ["Bar Charts", "Line Charts", "Interactive"]
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Toast-System und Notification Center",
      href: "/examples/notifications",
      features: ["Real-time", "Type Variants", "Settings"]
    },
    {
      icon: Settings,
      title: "Settings Management",
      description: "Umfassendes Präferenzen-System",
      href: "/examples/settings",
      features: ["Tabs", "Export/Import", "Validation"]
    }
  ];

  const highlights = [
    {
      icon: Shield,
      title: "Security First",
      description: "CSP Headers, Input Validation, sichere Defaults",
      items: ["Zod Runtime Validation", "TypeScript Strict Mode", "XSS Protection"]
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Code-Splitting, Lazy Loading, Optimierungen",
      items: ["Bundle Optimization", "Image Optimization", "Route-based Splitting"]
    },
    {
      icon: Layout,
      title: "Developer Experience",
      description: "TypeScript, ESLint, Prettier, Hot Reload",
      items: ["IntelliSense", "Auto-formatting", "Error Boundaries"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="relative">
          <header className="border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">N</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Next.js Template</h1>
                    <p className="text-sm text-muted-foreground">Production-Ready • TanStack • TypeScript</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://github.com" target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                  <ThemeSwitch />
                </div>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Production Ready
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Modern Next.js
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {" "}Template
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Vollständiges Template mit TanStack Suite, TypeScript Strict Mode, 
                  Security Headers und Production-optimierten Konfigurationen.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/examples">
                    Examples erkunden
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/examples/tables">
                    Live Demo
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>TypeScript Strict</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Zero Runtime Errors</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Security Headers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Performance Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Features Grid */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold">Integrierte Features</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Alle wichtigen Komponenten für moderne Web-Anwendungen, 
              optimiert für Performance und Developer Experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, itemIndex) => (
                        <Badge key={itemIndex} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                      <Link href={feature.href as any}>
                        Beispiele ansehen
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Highlights */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold">Warum dieses Template?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Production-erprobte Konfigurationen und Best Practices 
              für schnelle und sichere Entwicklung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{highlight.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {highlight.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {highlight.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Technologie-Stack</h3>
          </div>
          
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="font-semibold text-lg mb-2">Frontend</div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Next.js 15.2.1</div>
                    <div>React 18.3.1</div>
                    <div>TypeScript 5.6.3</div>
                    <div>Tailwind CSS 4</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-lg mb-2">TanStack</div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Query 5.85.6</div>
                    <div>Form 1.19.3</div>
                    <div>Table 8.21.3</div>
                    <div>Router (Ready)</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-lg mb-2">UI & Design</div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>shadcn/ui</div>
                    <div>Lucide Icons</div>
                    <div>Dark Mode</div>
                    <div>Responsive</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-lg mb-2">Quality</div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Zod 4.1.5</div>
                    <div>ESLint + Prettier</div>
                    <div>Strict TypeScript</div>
                    <div>Error Boundaries</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-8 py-16">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Bereit zum Entwickeln?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Starten Sie mit diesem Template und sparen Sie Wochen an Setup-Zeit. 
              Alle wichtigen Konfigurationen sind bereits optimiert.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/examples">
                Alle Examples ansehen
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/examples/forms">
                Forms Demo
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">N</span>
                </div>
                <span className="font-semibold">Next.js Template</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Production-ready Template mit modernen Best Practices 
                für schnelle und sichere Web-Entwicklung.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Examples</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/examples/query" className="hover:text-foreground transition-colors">TanStack Query</Link></li>
                <li><Link href="/examples/forms" className="hover:text-foreground transition-colors">TanStack Form</Link></li>
                <li><Link href="/examples/tables" className="hover:text-foreground transition-colors">TanStack Table</Link></li>
                <li><Link href="/examples/visualization" className="hover:text-foreground transition-colors">Data Visualization</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Components</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/examples/notifications" className="hover:text-foreground transition-colors">Notifications</Link></li>
                <li><Link href="/examples/settings" className="hover:text-foreground transition-colors">Settings</Link></li>
                <li><Link href="/examples/auth" className="hover:text-foreground transition-colors">Authentication</Link></li>
                <li><Link href="/examples/layout" className="hover:text-foreground transition-colors">Layouts</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/examples/performance" className="hover:text-foreground transition-colors">Performance</Link></li>
                <li><Link href="/examples/responsive" className="hover:text-foreground transition-colors">Responsive</Link></li>
                <li><Link href="https://tanstack.com" target="_blank" className="hover:text-foreground transition-colors flex items-center">
                  TanStack Docs <ExternalLink className="h-3 w-3 ml-1" />
                </Link></li>
                <li><Link href="https://nextjs.org" target="_blank" className="hover:text-foreground transition-colors flex items-center">
                  Next.js Docs <ExternalLink className="h-3 w-3 ml-1" />
                </Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Next.js Template. Gebaut mit Next.js, TanStack und TypeScript.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
