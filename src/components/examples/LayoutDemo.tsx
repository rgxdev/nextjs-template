"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Layout as LayoutIcon, 
  Sidebar, 
  Menu,
  X,
  Grid,
  Columns,
  Maximize2,
  Minimize2,
  Monitor,
  Tablet,
  Smartphone
} from "lucide-react";

interface LayoutConfig {
  readonly sidebar: "open" | "closed" | "mini";
  readonly grid: "1" | "2" | "3" | "4";
  readonly responsive: "desktop" | "tablet" | "mobile";
  readonly fullscreen: boolean;
}

const defaultLayout: LayoutConfig = {
  sidebar: "open",
  grid: "3",
  responsive: "desktop",
  fullscreen: false
};

export function LayoutDemo() {
  const [layout, setLayout] = useState<LayoutConfig>(defaultLayout);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const updateLayout = <K extends keyof LayoutConfig>(
    key: K,
    value: LayoutConfig[K]
  ) => {
    setLayout(prev => ({ ...prev, [key]: value }));
  };

  const getGridCols = () => {
    switch (layout.grid) {
      case "1": return "grid-cols-1";
      case "2": return "grid-cols-1 md:grid-cols-2";
      case "3": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case "4": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default: return "grid-cols-3";
    }
  };

  const getResponsiveClass = () => {
    switch (layout.responsive) {
      case "mobile": return "max-w-sm";
      case "tablet": return "max-w-3xl";
      case "desktop": return "max-w-7xl";
      default: return "max-w-7xl";
    }
  };

  const getSidebarWidth = () => {
    switch (layout.sidebar) {
      case "open": return "w-64";
      case "mini": return "w-16";
      case "closed": return "w-0";
      default: return "w-64";
    }
  };

  return (
    <div className="space-y-6">
      {/* Layout Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LayoutIcon className="h-5 w-5" />
            <span>Layout Konfiguration</span>
          </CardTitle>
          <CardDescription>
            Testen Sie verschiedene Layout-Optionen und Responsive-Verhalten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sidebar Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sidebar</label>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant={layout.sidebar === "open" ? "default" : "outline"}
                  onClick={() => updateLayout("sidebar", "open")}
                >
                  <Sidebar className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={layout.sidebar === "mini" ? "default" : "outline"}
                  onClick={() => updateLayout("sidebar", "mini")}
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={layout.sidebar === "closed" ? "default" : "outline"}
                  onClick={() => updateLayout("sidebar", "closed")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Grid Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Grid Layout</label>
              <div className="flex space-x-1">
                {["1", "2", "3", "4"].map((cols) => (
                  <Button
                    key={cols}
                    size="sm"
                    variant={layout.grid === cols ? "default" : "outline"}
                    onClick={() => updateLayout("grid", cols as LayoutConfig["grid"])}
                  >
                    {cols === "1" && <Grid className="h-4 w-4" />}
                    {cols === "2" && <Columns className="h-4 w-4" />}
                    {cols === "3" && <Grid className="h-4 w-4" />}
                    {cols === "4" && <Grid className="h-4 w-4" />}
                  </Button>
                ))}
              </div>
            </div>

            {/* Responsive Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Responsive</label>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant={layout.responsive === "mobile" ? "default" : "outline"}
                  onClick={() => updateLayout("responsive", "mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={layout.responsive === "tablet" ? "default" : "outline"}
                  onClick={() => updateLayout("responsive", "tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={layout.responsive === "desktop" ? "default" : "outline"}
                  onClick={() => updateLayout("responsive", "desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Fullscreen Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Ansicht</label>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant={layout.fullscreen ? "default" : "outline"}
                  onClick={() => updateLayout("fullscreen", !layout.fullscreen)}
                >
                  {layout.fullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowModal(true)}
                >
                  Modal
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowDrawer(true)}
                >
                  Drawer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Demo */}
      <div className={`mx-auto transition-all duration-300 ${getResponsiveClass()}`}>
        <div className={`border rounded-lg overflow-hidden ${layout.fullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}>
          <div className="flex h-96">
            {/* Sidebar */}
            <div className={`${getSidebarWidth()} bg-muted transition-all duration-300 overflow-hidden flex-shrink-0`}>
              {layout.sidebar !== "closed" && (
                <div className="p-4">
                  <div className="space-y-2">
                    {layout.sidebar === "open" ? (
                      <>
                        <div className="font-medium">Navigation</div>
                        <div className="space-y-1">
                          <div className="p-2 bg-primary/10 rounded text-sm">Dashboard</div>
                          <div className="p-2 hover:bg-background rounded text-sm cursor-pointer">Projekte</div>
                          <div className="p-2 hover:bg-background rounded text-sm cursor-pointer">Team</div>
                          <div className="p-2 hover:bg-background rounded text-sm cursor-pointer">Einstellungen</div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-8 h-8 bg-primary/10 rounded"></div>
                        <div className="w-8 h-8 bg-background rounded"></div>
                        <div className="w-8 h-8 bg-background rounded"></div>
                        <div className="w-8 h-8 bg-background rounded"></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="border-b bg-background p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Layout Demo</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {layout.grid} Spalte{layout.grid !== "1" ? "n" : ""}
                    </Badge>
                    <Badge variant="outline">
                      {layout.responsive === "mobile" ? "Mobile" :
                       layout.responsive === "tablet" ? "Tablet" : "Desktop"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="flex-1 p-4 overflow-auto">
                <div className={`grid ${getGridCols()} gap-4 h-full`}>
                  {Array.from({ length: parseInt(layout.grid) * 2 }).map((_, index) => (
                    <Card key={index} className="h-32">
                      <CardContent className="p-4">
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <div className="text-2xl font-bold mb-1">{index + 1}</div>
                            <div className="text-sm">Grid Item</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Modal Dialog</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Dies ist ein Beispiel für ein Modal-Dialog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Modal-Dialoge werden für wichtige Aktionen oder Informationen verwendet, 
                die die Aufmerksamkeit des Benutzers erfordern.
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Abbrechen
                </Button>
                <Button onClick={() => setShowModal(false)}>
                  Bestätigen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDrawer(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-background shadow-lg transform transition-transform">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Drawer Panel</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDrawer(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                Drawer-Komponenten eignen sich für zusätzliche Inhalte oder 
                Konfigurationsoptionen, die nicht den Hauptinhalt überlagern sollen.
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-muted rounded">
                  <div className="font-medium text-sm">Option 1</div>
                  <div className="text-xs text-muted-foreground">Beschreibung der ersten Option</div>
                </div>
                <div className="p-3 bg-muted rounded">
                  <div className="font-medium text-sm">Option 2</div>
                  <div className="text-xs text-muted-foreground">Beschreibung der zweiten Option</div>
                </div>
                <div className="p-3 bg-muted rounded">
                  <div className="font-medium text-sm">Option 3</div>
                  <div className="text-xs text-muted-foreground">Beschreibung der dritten Option</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layout Information */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Patterns</CardTitle>
          <CardDescription>
            Implementierte Layout-Muster und Best Practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Responsive Design</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Mobile-First Ansatz</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Flexibles Grid-System</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Adaptive Sidebar</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Touch-freundliche Bedienung</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">UI Patterns</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Modal Dialogs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Slide-out Drawers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Collapsible Sidebar</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Fullscreen Toggle</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
