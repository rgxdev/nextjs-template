"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  X,
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";

interface NotificationItem {
  readonly id: string;
  readonly type: "success" | "warning" | "info" | "error";
  readonly title: string;
  readonly message: string;
  readonly timestamp: Date;
  readonly read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "success",
    title: "Bestellung erfolgreich",
    message: "Ihre Bestellung #12345 wurde erfolgreich aufgegeben und wird bearbeitet.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: "2", 
    type: "warning",
    title: "Zahlungserinnerung",
    message: "Ihre Rechnung #INV-2024-001 ist in 3 Tagen fällig.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: "3",
    type: "info", 
    title: "System-Update",
    message: "Ein neues Feature-Update ist verfügbar. Möchten Sie es jetzt installieren?",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: "4",
    type: "error",
    title: "Sync-Fehler",
    message: "Die Synchronisation mit dem Server ist fehlgeschlagen. Bitte versuchen Sie es erneut.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: "5",
    type: "success",
    title: "Backup erstellt",
    message: "Ihr automatisches Backup wurde erfolgreich erstellt und gespeichert.",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    read: true,
  },
];

const getNotificationIcon = (type: NotificationItem["type"]) => {
  switch (type) {
    case "success":
      return CheckCircle;
    case "warning":
      return AlertTriangle;
    case "info":
      return Info;
    case "error":
      return X;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: NotificationItem["type"]) => {
  switch (type) {
    case "success":
      return "text-green-600 bg-green-50 dark:bg-green-950/20";
    case "warning":
      return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20";
    case "info":
      return "text-blue-600 bg-blue-50 dark:bg-blue-950/20";
    case "error":
      return "text-red-600 bg-red-50 dark:bg-red-950/20";
    default:
      return "text-gray-600 bg-gray-50 dark:bg-gray-950/20";
  }
};

const getBadgeVariant = (type: NotificationItem["type"]) => {
  switch (type) {
    case "success":
      return "default";
    case "warning":
      return "secondary";
    case "info":
      return "outline";
    case "error":
      return "destructive";
    default:
      return "outline";
  }
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `vor ${diffInMinutes} Min`;
  } else if (diffInHours < 24) {
    return `vor ${diffInHours} Std`;
  } else {
    return `vor ${diffInDays} Tag${diffInDays > 1 ? "en" : ""}`;
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <CardTitle>Benachrichtigungen</CardTitle>
                <CardDescription>
                  {unreadCount > 0 
                    ? `${unreadCount} ungelesene Benachrichtigung${unreadCount > 1 ? "en" : ""}`
                    : "Alle Benachrichtigungen gelesen"
                  }
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilter(filter === "all" ? "unread" : "all")}
              >
                {filter === "all" ? "Nur Ungelesene" : "Alle anzeigen"}
              </Button>
              
              {unreadCount > 0 && (
                <Button size="sm" onClick={markAllAsRead}>
                  Alle als gelesen markieren
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] overflow-y-auto pr-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {filter === "unread" 
                    ? "Keine ungelesenen Benachrichtigungen"
                    : "Keine Benachrichtigungen vorhanden"
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colorClass = getNotificationColor(notification.type);
                  
                  return (
                    <div
                      key={notification.id}
                      className={`relative p-4 rounded-lg border transition-all hover:shadow-sm ${
                        !notification.read 
                          ? "bg-muted/50 border-primary/20" 
                          : "bg-background"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${colorClass}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-sm">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={getBadgeVariant(notification.type)} className="text-xs">
                                {notification.type === "success" ? "Erfolg" :
                                 notification.type === "warning" ? "Warnung" :
                                 notification.type === "info" ? "Info" :
                                 "Fehler"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Als gelesen markieren
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              Löschen
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Benachrichtigungseinstellungen</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sound-Benachrichtigungen</h4>
                <p className="text-sm text-muted-foreground">
                  Akustische Signale bei neuen Benachrichtigungen
                </p>
              </div>
              <Button
                variant={soundEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? "Aktiviert" : "Deaktiviert"}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-Aktualisierung</h4>
                <p className="text-sm text-muted-foreground">
                  Automatisches Laden neuer Benachrichtigungen
                </p>
              </div>
              <Button variant="outline" size="sm">
                Konfigurieren
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">E-Mail-Digest</h4>
                <p className="text-sm text-muted-foreground">
                  Tägliche Zusammenfassung per E-Mail
                </p>
              </div>
              <Button variant="outline" size="sm">
                Einrichten
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
