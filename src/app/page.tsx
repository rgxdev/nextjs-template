import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/examples/ContactForm";
import { UserTable } from "@/components/examples/UserTable";
import ThemeSwitch from "@/components/core/default/ThemeSwitcher";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Template mit TanStack",
  description: "Modernes Next.js Template mit TanStack Query, Form, Table und sicheren Defaults",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Next.js Template</h1>
              <p className="text-muted-foreground">Mit TanStack und sicheren Defaults</p>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Willkommen</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Dieses Template zeigt die Integration von TanStack-Bibliotheken mit Next.js, 
                TypeScript und sicheren Coding-Praktiken.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>TanStack Query</CardTitle>
                  <CardDescription>
                    Datenabfrage und -cache-Management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Optimistische Updates, automatisches Caching und Fehlerbehandlung.
                  </p>
                  <Button asChild>
                    <Link href="/examples/query">Query Beispiele</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>TanStack Form</CardTitle>
                  <CardDescription>
                    Typsichere Formular-Validierung
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schema-basierte Validierung mit Zod und optimaler Benutzerführung.
                  </p>
                  <Button asChild>
                    <Link href="#contact">Kontaktformular</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>TanStack Table</CardTitle>
                  <CardDescription>
                    Leistungsstarke Datentabellen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sortierung, Paginierung und Virtualisierung für große Datensätze.
                  </p>
                  <Button asChild>
                    <Link href="#table">Tabellen-Beispiel</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Sicherheits-Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card variant="outline">
                  <CardHeader>
                    <CardTitle className="text-lg">TypeScript Strict Mode</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Strenge Typisierung aktiviert</li>
                      <li>• noImplicitAny und noUncheckedIndexedAccess</li>
                      <li>• Zur Compile-Zeit erkannte Fehler</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card variant="outline">
                  <CardHeader>
                    <CardTitle className="text-lg">Zod Schema Validation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Runtime-Validierung aller Eingaben</li>
                      <li>• Type-safe API-Boundaries</li>
                      <li>• Automatische Type-Inference</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section id="table">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Benutzer-Tabelle</h2>
              <p className="text-muted-foreground">
                Beispiel einer sortierbaren und paginierten Tabelle mit TanStack Table.
              </p>
            </div>
            <UserTable />
          </section>

          <section id="contact">
            <ContactForm />
          </section>
        </div>
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>Next.js Template mit TanStack • Gebaut mit TypeScript und Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
