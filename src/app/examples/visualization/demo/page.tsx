import { DataVisualization } from "@/components/examples/DataVisualization";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HatchedBarMultipleChart } from "@/components/ui/hatched-bar-multiple-chart";

export default function VisualizationDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/examples/visualization">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Datenvisualisierung Demo
            </h1>
            <p className="text-muted-foreground">
              Interaktive Charts und Metriken ohne externe Dependencies
            </p>
          </div>
        </div>

        <DataVisualization />

        <HatchedBarMultipleChart />
      </div>
    </div>
  );
}
