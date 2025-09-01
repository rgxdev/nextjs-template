import { Metadata } from "next";
import { QueryExamples } from "@/components/examples/QueryExamples";

export const metadata: Metadata = {
  title: "TanStack Query Beispiele",
  description: "Demonstriert die Verwendung von TanStack Query für Datenabfragen, Caching und Mutationen",
};

export default function QueryPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">TanStack Query Beispiele</h1>
          <p className="text-muted-foreground mt-2">
            Demonstriert Datenabfragen, Caching, Mutationen und optimistische Updates
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <QueryExamples />
      </main>
    </div>
  );
}
