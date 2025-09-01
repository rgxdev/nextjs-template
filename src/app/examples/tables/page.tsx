import { Metadata } from "next";
import { AdvancedUserTable } from "@/components/examples/AdvancedUserTable";
import { UserTable } from "@/components/examples/UserTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Tabellen Beispiele",
  description: "TanStack Table Beispiele mit verschiedenen Features",
};

export default function TablesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold">Tabellen Beispiele</h1>
            <p className="text-muted-foreground mt-2">
              Verschiedene TanStack Table Implementierungen mit erweiterten Features
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Einfache Tabelle */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Einfache Tabelle</CardTitle>
              <CardDescription>
                Grundlegende Tabelle mit Sortierung und Paginierung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserTable />
            </CardContent>
          </Card>
        </section>

        {/* Erweiterte Tabelle */}
        <section>
          <AdvancedUserTable />
        </section>

        {/* Feature-Übersicht */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>TanStack Table Features</CardTitle>
              <CardDescription>
                Übersicht der implementierten Funktionen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Sortierung</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Klickbare Spaltenheader</li>
                    <li>• Aufsteigend/Absteigend</li>
                    <li>• Multi-Column Sorting</li>
                    <li>• Visuelle Indikatoren</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Filterung</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Globale Suche</li>
                    <li>• Spalten-spezifische Filter</li>
                    <li>• Dropdown-Filter</li>
                    <li>• Echtzeit-Filterung</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Paginierung</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Anpassbare Seitengröße</li>
                    <li>• Navigation zwischen Seiten</li>
                    <li>• Sprung zur ersten/letzten Seite</li>
                    <li>• Statusinformationen</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Auswahl</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Einzelne Zeilen auswählen</li>
                    <li>• Alle Zeilen auswählen</li>
                    <li>• Bulk-Aktionen</li>
                    <li>• Auswahl-Indikatoren</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Spalten</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Spalten ein-/ausblenden</li>
                    <li>• Anpassbare Breiten</li>
                    <li>• Custom Cell Renderer</li>
                    <li>• Sticky Columns</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Export & Aktionen</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CSV Export</li>
                    <li>• Zeilen-Aktionen</li>
                    <li>• Bulk-Export</li>
                    <li>• Custom Aktions-Menüs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Code-Beispiel */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Code-Beispiel</CardTitle>
              <CardDescription>
                Grundlegende Implementierung einer TanStack Table
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const table = useReactTable({
  data,
  columns,
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  onRowSelectionChange: setRowSelection,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    sorting,
    columnFilters,
    rowSelection,
  },
});`}</code>
              </pre>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
