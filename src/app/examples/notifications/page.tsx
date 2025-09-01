import { NotificationCenter } from "@/components/examples/NotificationCenter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Volume2,
  Settings,
  ArrowLeft
} from "lucide-react";

export default function NotificationsPage() {
  const features = [
    {
      icon: Bell,
      title: "Real-time Benachrichtigungen",
      description: "Sofortige Benachrichtigungen für wichtige Events und Updates"
    },
    {
      icon: CheckCircle,
      title: "Verschiedene Typen",
      description: "Success, Warning, Info und Error Benachrichtigungen mit Icons"
    },
    {
      icon: Volume2,
      title: "Sound & Einstellungen",
      description: "Konfigurierbare Audio-Signale und Benachrichtigungseinstellungen"
    },
    {
      icon: Settings,
      title: "Filterung & Verwaltung",
      description: "Filtern nach gelesen/ungelesen, Batch-Aktionen und automatische Verwaltung"
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
              Notification Center
            </h1>
            <p className="text-muted-foreground">
              Umfassendes Benachrichtigungssystem mit verschiedenen Typen und Verwaltungsfunktionen
            </p>
          </div>
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

        <NotificationCenter />

        <Card>
          <CardHeader>
            <CardTitle>Implementation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">🔔 Notification Types</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Success:</strong> Erfolgreiche Aktionen und Bestätigungen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span><strong>Warning:</strong> Wichtige Hinweise und Erinnerungen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span><strong>Info:</strong> Allgemeine Informationen und Updates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-red-600 flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <span><strong>Error:</strong> Fehlermeldungen und kritische Probleme</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">⚡ Features</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Real-time Benachrichtigungsanzeige</li>
                  <li>• Gelesen/Ungelesen Status-Management</li>
                  <li>• Filterung nach Benachrichtigungstyp</li>
                  <li>• Batch-Aktionen (alle als gelesen markieren)</li>
                  <li>• Zeitstempel mit relativer Anzeige</li>
                  <li>• Konfigurierbare Sound-Einstellungen</li>
                  <li>• Responsive Design für alle Geräte</li>
                  <li>• Accessibility-optimiert</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
