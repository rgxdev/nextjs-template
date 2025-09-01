import { SettingsManager } from "@/components/examples/SettingsManager";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/examples">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zu Examples
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Einstellungen & Präferenzen
            </h1>
            <p className="text-muted-foreground">
              Umfassendes Settings-Management mit Tabs und Export/Import
            </p>
          </div>
        </div>

        <SettingsManager />
      </div>
    </div>
  );
}
