"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Bell, 
  Palette, 
  Globe, 
  Shield, 
  Zap,
  Download,
  Upload,
  Save,
  RotateCcw
} from "lucide-react";

interface UserSettings {
  readonly profile: {
    readonly name: string;
    readonly email: string;
    readonly avatar: string;
    readonly bio: string;
  };
  readonly notifications: {
    readonly email: boolean;
    readonly push: boolean;
    readonly marketing: boolean;
    readonly frequency: "immediate" | "daily" | "weekly";
  };
  readonly appearance: {
    readonly theme: "light" | "dark" | "system";
    readonly language: string;
    readonly fontSize: number;
    readonly reducedMotion: boolean;
  };
  readonly privacy: {
    readonly profileVisibility: "public" | "private" | "friends";
    readonly dataCollection: boolean;
    readonly analytics: boolean;
  };
  readonly performance: {
    readonly autoSave: boolean;
    readonly cacheSize: number;
    readonly preloadContent: boolean;
  };
}

const defaultSettings: UserSettings = {
  profile: {
    name: "Max Mustermann",
    email: "max.mustermann@example.com", 
    avatar: "/avatars/default.png",
    bio: "Full-Stack Developer mit Fokus auf moderne Web-Technologien"
  },
  notifications: {
    email: true,
    push: false,
    marketing: true,
    frequency: "daily"
  },
  appearance: {
    theme: "system",
    language: "de",
    fontSize: 16,
    reducedMotion: false
  },
  privacy: {
    profileVisibility: "public",
    dataCollection: true,
    analytics: false
  },
  performance: {
    autoSave: true,
    cacheSize: 50,
    preloadContent: true
  }
};

export function SettingsManager() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<keyof UserSettings>("profile");
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = <T extends keyof UserSettings, K extends keyof UserSettings[T]>(
    section: T,
    key: K,
    value: UserSettings[T][K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // Hier würde normalerweise die Speicherung an den Server erfolgen
    console.log("Settings saved:", settings);
    setHasChanges(false);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "settings.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          setHasChanges(true);
        } catch (error) {
          console.error("Failed to import settings:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { key: "profile" as const, label: "Profil", icon: User },
    { key: "notifications" as const, label: "Benachrichtigungen", icon: Bell },
    { key: "appearance" as const, label: "Erscheinungsbild", icon: Palette },
    { key: "privacy" as const, label: "Datenschutz", icon: Shield },
    { key: "performance" as const, label: "Performance", icon: Zap }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Einstellungen</h2>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Präferenzen und Konfigurationen
          </p>
        </div>
        {hasChanges && (
          <Badge variant="secondary" className="animate-pulse">
            Ungespeicherte Änderungen
          </Badge>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profil-Einstellungen</CardTitle>
                <CardDescription>
                  Verwalten Sie Ihre persönlichen Informationen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) => updateSetting("profile", "name", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-Mail</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => updateSetting("profile", "email", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    value={settings.profile.bio}
                    onChange={(e) => updateSetting("profile", "bio", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-background h-20 resize-none"
                    placeholder="Erzählen Sie etwas über sich..."
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Benachrichtigungs-Einstellungen</CardTitle>
                <CardDescription>
                  Konfigurieren Sie, wie Sie benachrichtigt werden möchten
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">E-Mail Benachrichtigungen</h4>
                    <p className="text-sm text-muted-foreground">
                      Erhalten Sie wichtige Updates per E-Mail
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked: boolean) => updateSetting("notifications", "email", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push-Benachrichtigungen</h4>
                    <p className="text-sm text-muted-foreground">
                      Sofortige Benachrichtigungen im Browser
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => updateSetting("notifications", "push", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing E-Mails</h4>
                    <p className="text-sm text-muted-foreground">
                      Produktneuigkeiten und Angebote
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketing}
                    onCheckedChange={(checked) => updateSetting("notifications", "marketing", checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Benachrichtigungs-Häufigkeit</label>
                  <Select
                    value={settings.notifications.frequency}
                    onValueChange={(value: "immediate" | "daily" | "weekly") => 
                      updateSetting("notifications", "frequency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Sofort</SelectItem>
                      <SelectItem value="daily">Täglich</SelectItem>
                      <SelectItem value="weekly">Wöchentlich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <Card>
              <CardHeader>
                <CardTitle>Erscheinungsbild</CardTitle>
                <CardDescription>
                  Passen Sie das Design und die Sprache an
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Theme</label>
                  <Select
                    value={settings.appearance.theme}
                    onValueChange={(value: "light" | "dark" | "system") => 
                      updateSetting("appearance", "theme", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Hell</SelectItem>
                      <SelectItem value="dark">Dunkel</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sprache</label>
                  <Select
                    value={settings.appearance.language}
                    onValueChange={(value: string) => updateSetting("appearance", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Schriftgröße: {settings.appearance.fontSize}px
                  </label>
                  <Slider
                    value={[settings.appearance.fontSize]}
                    onValueChange={([value]) => updateSetting("appearance", "fontSize", value)}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Reduzierte Bewegungen</h4>
                    <p className="text-sm text-muted-foreground">
                      Animationen und Übergänge minimieren
                    </p>
                  </div>
                  <Switch
                    checked={settings.appearance.reducedMotion}
                    onCheckedChange={(checked) => updateSetting("appearance", "reducedMotion", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Settings */}
          {activeTab === "privacy" && (
            <Card>
              <CardHeader>
                <CardTitle>Datenschutz-Einstellungen</CardTitle>
                <CardDescription>
                  Kontrollieren Sie Ihre Privatsphäre und Datenfreigabe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profil-Sichtbarkeit</label>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value: "public" | "private" | "friends") => 
                      updateSetting("privacy", "profileVisibility", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Öffentlich</SelectItem>
                      <SelectItem value="friends">Nur Freunde</SelectItem>
                      <SelectItem value="private">Privat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Datensammlung</h4>
                    <p className="text-sm text-muted-foreground">
                      Erlauben Sie die Sammlung von Nutzungsdaten
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.dataCollection}
                    onCheckedChange={(checked) => updateSetting("privacy", "dataCollection", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Anonyme Nutzungsstatistiken teilen
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.analytics}
                    onCheckedChange={(checked) => updateSetting("privacy", "analytics", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Performance Settings */}
          {activeTab === "performance" && (
            <Card>
              <CardHeader>
                <CardTitle>Performance-Einstellungen</CardTitle>
                <CardDescription>
                  Optimieren Sie die Anwendungsleistung
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Automatisches Speichern</h4>
                    <p className="text-sm text-muted-foreground">
                      Änderungen automatisch im Hintergrund speichern
                    </p>
                  </div>
                  <Switch
                    checked={settings.performance.autoSave}
                    onCheckedChange={(checked) => updateSetting("performance", "autoSave", checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Cache-Größe: {settings.performance.cacheSize}MB
                  </label>
                  <Slider
                    value={[settings.performance.cacheSize]}
                    onValueChange={([value]) => updateSetting("performance", "cacheSize", value)}
                    min={10}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Inhalte vorladen</h4>
                    <p className="text-sm text-muted-foreground">
                      Seiten im Hintergrund für schnellere Navigation laden
                    </p>
                  </div>
                  <Switch
                    checked={settings.performance.preloadContent}
                    onCheckedChange={(checked) => updateSetting("performance", "preloadContent", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aktionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={saveSettings} 
                disabled={!hasChanges}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                Speichern
              </Button>
              
              <Button 
                variant="outline" 
                onClick={resetSettings}
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Zurücksetzen
              </Button>
              
              <Button 
                variant="outline" 
                onClick={exportSettings}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportieren
              </Button>
              
              <label className="w-full">
                <input
                  type="file"
                  accept=".json"
                  onChange={importSettings}
                  className="hidden"
                />
                <Button variant="outline" className="w-full cursor-pointer" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Importieren
                  </span>
                </Button>
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Aktiver Tab:</span>
                <Badge variant="outline">
                  {tabs.find(t => t.key === activeTab)?.label}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Änderungen:</span>
                <Badge variant={hasChanges ? "secondary" : "default"}>
                  {hasChanges ? "Ungespeichert" : "Gespeichert"}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Theme:</span>
                <Badge variant="outline">
                  {settings.appearance.theme === "light" ? "Hell" :
                   settings.appearance.theme === "dark" ? "Dunkel" : "System"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
