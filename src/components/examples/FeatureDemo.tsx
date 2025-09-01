"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal, ConfirmDialog } from "@/components/ui/modal";
import { useToastActions } from "@/components/ui/toast-system";
import { Textarea } from "@/components/ui/textarea";
import { FormSkeleton, CardSkeleton } from "@/components/ui/loading-skeletons";

export function FeatureDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSkeletons, setShowSkeletons] = useState(false);
  
  const toast = useToastActions();

  const handleToastDemo = (type: "success" | "error" | "warning" | "info") => {
    const messages = {
      success: {
        title: "Erfolgreich!",
        description: "Die Aktion wurde erfolgreich ausgeführt.",
      },
      error: {
        title: "Fehler aufgetreten",
        description: "Es ist ein unerwarteter Fehler aufgetreten.",
      },
      warning: {
        title: "Warnung",
        description: "Diese Aktion könnte unerwünschte Folgen haben.",
      },
      info: {
        title: "Information",
        description: "Hier sind einige wichtige Informationen für Sie.",
      },
    };

    const message = messages[type];
    toast[type](message.title, message.description, {
      action: {
        label: "Rückgängig",
        onClick: () => toast.info("Rückgängig", "Aktion wurde rückgängig gemacht"),
      },
    });
  };

  const handleAsyncAction = async () => {
    setIsLoading(true);
    toast.info("Wird verarbeitet...", "Bitte warten Sie einen Moment");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Verarbeitung abgeschlossen", "Die Daten wurden erfolgreich gespeichert");
    } catch (error) {
      toast.error("Verarbeitung fehlgeschlagen", "Es ist ein Fehler aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSkeletons = () => {
    setShowSkeletons(!showSkeletons);
    setTimeout(() => setShowSkeletons(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Demos */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Toast-Benachrichtigungen</CardTitle>
            <CardDescription>
              Verschiedene Arten von Benachrichtigungen mit unserem Toast-System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => handleToastDemo("success")}
                variant="default"
              >
                Erfolg
              </Button>
              <Button
                onClick={() => handleToastDemo("error")}
                variant="destructive"
              >
                Fehler
              </Button>
              <Button
                onClick={() => handleToastDemo("warning")}
                variant="outline"
              >
                Warnung
              </Button>
              <Button
                onClick={() => handleToastDemo("info")}
                variant="secondary"
              >
                Info
              </Button>
            </div>
            <div className="mt-4">
              <Button
                onClick={handleAsyncAction}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Wird verarbeitet..." : "Async-Aktion ausführen"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Modal Demos */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Modal-Dialoge</CardTitle>
            <CardDescription>
              Verschiedene Modal-Typen für Benutzerinteraktionen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => setIsModalOpen(true)}>
                Standard Modal
              </Button>
              <Button
                onClick={() => setIsConfirmOpen(true)}
                variant="destructive"
              >
                Bestätigungs-Dialog
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Loading States */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
            <CardDescription>
              Skeleton-Loader für bessere Benutzererfahrung
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={toggleSkeletons} className="mb-4">
              {showSkeletons ? "Lade..." : "Loading States zeigen"}
            </Button>
            
            {showSkeletons ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSkeleton />
                <CardSkeleton />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Echte Karte</CardTitle>
                    <CardDescription>Dies ist eine echte Karte mit Inhalt</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Hier würde normalerweise der richtige Inhalt stehen.
                    </p>
                    <Button className="mt-4">Aktion ausführen</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Formular</CardTitle>
                    <CardDescription>Ein beispielhaftes Formular</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input placeholder="Ihr Name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Nachricht</label>
                      <Textarea placeholder="Ihre Nachricht" />
                    </div>
                    <Button className="w-full">Senden</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Standard Modal"
        description="Dies ist ein Beispiel für ein Standard-Modal"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Hier können Sie beliebige Inhalte platzieren. Das Modal unterstützt
            Fokus-Management, Escape-Taste zum Schließen und Click-outside-Verhalten.
          </p>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Beispiel-Eingabe</label>
            <Input placeholder="Geben Sie etwas ein..." />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => {
              setIsModalOpen(false);
              toast.success("Gespeichert", "Ihre Eingabe wurde gespeichert");
            }}>
              Speichern
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          toast.success("Gelöscht", "Der Eintrag wurde erfolgreich gelöscht");
        }}
        title="Eintrag löschen"
        description="Sind Sie sicher, dass Sie diesen Eintrag löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden."
        confirmText="Löschen"
        cancelText="Abbrechen"
        variant="destructive"
      />
    </div>
  );
}
