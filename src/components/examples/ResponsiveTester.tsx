"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Eye,
  Code,
  ExternalLink
} from "lucide-react";

interface DevicePreset {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly category: "desktop" | "tablet" | "mobile";
}

const devicePresets: DevicePreset[] = [
  // Desktop
  { name: "Desktop Large", width: 1920, height: 1080, icon: Monitor, category: "desktop" },
  { name: "Desktop Medium", width: 1440, height: 900, icon: Monitor, category: "desktop" },
  { name: "Desktop Small", width: 1024, height: 768, icon: Laptop, category: "desktop" },
  
  // Tablet
  { name: "iPad Pro", width: 1024, height: 1366, icon: Tablet, category: "tablet" },
  { name: "iPad", width: 768, height: 1024, icon: Tablet, category: "tablet" },
  { name: "Tablet Landscape", width: 1024, height: 768, icon: Tablet, category: "tablet" },
  
  // Mobile
  { name: "iPhone 14 Pro", width: 393, height: 852, icon: Smartphone, category: "mobile" },
  { name: "iPhone SE", width: 375, height: 667, icon: Smartphone, category: "mobile" },
  { name: "Android Large", width: 412, height: 915, icon: Smartphone, category: "mobile" },
];

export function ResponsiveTester() {
  const [selectedDevice, setSelectedDevice] = useState<DevicePreset>(devicePresets[0]!);
  const [isPortrait, setIsPortrait] = useState(true);
  const [zoom, setZoom] = useState(0.5);
  const [showCode, setShowCode] = useState(false);
  const [testUrl, setTestUrl] = useState("https://example.com");

  const currentWidth = isPortrait ? selectedDevice.width : selectedDevice.height;
  const currentHeight = isPortrait ? selectedDevice.height : selectedDevice.width;

  const scaleToFit = Math.min(
    (window?.innerWidth - 100) / currentWidth,
    (window?.innerHeight - 300) / currentHeight,
    1
  );

  const deviceCategories = ["desktop", "tablet", "mobile"] as const;

  const getTestUrls = () => [
    { name: "Google", url: "https://google.com" },
    { name: "GitHub", url: "https://github.com" }, 
    { name: "Vercel", url: "https://vercel.com" },
    { name: "Localhost", url: "http://localhost:3000" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5" />
                <span>Responsive Design Tester</span>
              </CardTitle>
              <CardDescription>
                Teste deine Website auf verschiedenen Geräten und Bildschirmgrößen
              </CardDescription>
            </div>
            <Badge variant="outline">
              {currentWidth} × {currentHeight}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Device Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold">Gerät auswählen</h3>
              <div className="space-y-3">
                {deviceCategories.map(category => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 capitalize">
                      {category}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {devicePresets
                        .filter(device => device.category === category)
                        .map(device => {
                          const Icon = device.icon;
                          return (
                            <Button
                              key={device.name}
                              variant={selectedDevice.name === device.name ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedDevice(device)}
                              className="justify-start"
                            >
                              <Icon className="h-4 w-4 mr-2" />
                              <span className="truncate">{device.name}</span>
                            </Button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPortrait(!isPortrait)}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {isPortrait ? "Landscape" : "Portrait"}
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.max(0.25, zoom - 0.1))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.min(1, zoom + 0.1))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? <Eye className="h-4 w-4 mr-2" /> : <Code className="h-4 w-4 mr-2" />}
                {showCode ? "Preview" : "Code"}
              </Button>
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Test URL:</label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={testUrl}
                  onChange={(e) => setTestUrl(e.target.value)}
                  className="flex-1 px-3 py-2 border border-input rounded-md text-sm"
                  placeholder="https://example.com"
                />
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {getTestUrls().map(item => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size="sm"
                    onClick={() => setTestUrl(item.url)}
                    className="text-xs"
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Preview: {selectedDevice.name}</span>
            <Badge variant="secondary">
              {isPortrait ? "Portrait" : "Landscape"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg">
            <div 
              className="bg-white dark:bg-gray-900 border-8 border-gray-800 rounded-lg shadow-2xl overflow-hidden"
              style={{
                width: currentWidth * zoom,
                height: currentHeight * zoom,
                maxWidth: "100%",
                maxHeight: "70vh",
              }}
            >
              {showCode ? (
                <div className="p-4 h-full overflow-auto">
                  <pre className="text-xs">
                    <code>{`
/* CSS Media Queries für ${selectedDevice.name} */

@media (max-width: ${currentWidth}px) {
  /* Styles für ${selectedDevice.name} und kleiner */
  .container {
    padding: 1rem;
    max-width: 100%;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

/* Responsive Breakpoints */
@media (max-width: 640px) {  /* sm */
  /* Mobile Styles */
}

@media (max-width: 768px) {  /* md */
  /* Tablet Portrait */
}

@media (max-width: 1024px) { /* lg */
  /* Tablet Landscape & Small Desktop */
}

@media (max-width: 1280px) { /* xl */
  /* Desktop */
}

/* Tailwind Utility Classes */
.responsive-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
  @apply gap-4 p-4;
}

.responsive-text {
  @apply text-sm md:text-base lg:text-lg;
}
                    `}</code>
                  </pre>
                </div>
              ) : (
                <iframe
                  src={testUrl}
                  className="w-full h-full border-0"
                  title={`Preview on ${selectedDevice.name}`}
                  loading="lazy"
                />
              )}
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Aktueller Zoom: {Math.round(zoom * 100)}% | 
            Viewport: {currentWidth} × {currentHeight}px |
            Scale to fit: {Math.round(scaleToFit * 100)}%
          </div>
        </CardContent>
      </Card>

      {/* Device Info */}
      <Card>
        <CardHeader>
          <CardTitle>Geräteinformationen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Abmessungen</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Breite: {currentWidth}px</div>
                <div>Höhe: {currentHeight}px</div>
                <div>Seitenverhältnis: {(currentWidth / currentHeight).toFixed(2)}:1</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Kategorisierung</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Typ: {selectedDevice.category}</div>
                <div>Orientierung: {isPortrait ? "Portrait" : "Landscape"}</div>
                <div>Zoom: {Math.round(zoom * 100)}%</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">CSS Breakpoints</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>
                  {currentWidth <= 640 ? "✓" : "○"} sm (640px)
                </div>
                <div>
                  {currentWidth <= 768 ? "✓" : "○"} md (768px)
                </div>
                <div>
                  {currentWidth <= 1024 ? "✓" : "○"} lg (1024px)
                </div>
                <div>
                  {currentWidth <= 1280 ? "✓" : "○"} xl (1280px)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
