import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataTableComponentProps {
  onLoadComplete?: () => void;
}

export function DataTableComponent({ onLoadComplete }: DataTableComponentProps) {
  useEffect(() => {
    onLoadComplete?.();
  }, [onLoadComplete]);

  const tableData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Benutzer ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: Math.random() > 0.5 ? "Aktiv" : "Inaktiv",
    created: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE")
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Table Component geladen</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Lazy geladene Datentabelle mit {tableData.length} Einträgen.
        </p>
        <div className="rounded-md border max-h-64 overflow-y-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b sticky top-0 bg-background">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">E-Mail</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Erstellt</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {tableData.map((row) => (
                <tr key={row.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{row.id}</td>
                  <td className="p-4 align-middle">{row.name}</td>
                  <td className="p-4 align-middle">{row.email}</td>
                  <td className="p-4 align-middle">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === "Aktiv" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-muted-foreground">{row.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
