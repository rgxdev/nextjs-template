import { Metadata } from "next";
import { ContactForm } from "@/components/examples/ContactForm";
import { MultiStepForm } from "@/components/examples/MultiStepForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Form Beispiele",
  description: "Demonstriert verschiedene Formular-Typen mit Zod-Validierung und TypeScript",
};

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Form Beispiele</h1>
          <p className="text-muted-foreground mt-2">
            Verschiedene Formular-Implementierungen mit Zod-Validierung
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Einfaches Kontaktformular</CardTitle>
                <CardDescription>
                  Grundlegende Validierung mit Zod-Schema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>✓ Real-time Validierung</li>
                  <li>✓ TypeScript Integration</li>
                  <li>✓ Fehlerbehandlung</li>
                  <li>✓ Responsive Design</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multi-Step Formular</CardTitle>
                <CardDescription>
                  Komplexe Formulare mit Schritt-für-Schritt Validierung
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>✓ Schritt-basierte Validierung</li>
                  <li>✓ Progress Indicator</li>
                  <li>✓ Conditional Fields</li>
                  <li>✓ Data Persistence</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-6">Multi-Step Formular</h2>
            <MultiStepForm />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Kontaktformular</h2>
            <ContactForm />
          </section>
        </div>
      </main>
    </div>
  );
}
