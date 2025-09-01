"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type PaginationState,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter,
  Download,
  Eye,
  EyeOff,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: "admin" | "user" | "editor" | "viewer";
  readonly status: "active" | "inactive" | "pending";
  readonly lastLogin: Date;
  readonly department: string;
  readonly avatar?: string;
}

const columnHelper = createColumnHelper<User>();

// Mock data with more realistic information
const generateMockUsers = (): User[] => {
  const roles: User["role"][] = ["admin", "user", "editor", "viewer"];
  const statuses: User["status"][] = ["active", "inactive", "pending"];
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Design"];
  const names = [
    "Max Mustermann", "Maria Schmidt", "Hans Weber", "Anna Müller", "Peter Klein",
    "Laura Wagner", "Thomas Becker", "Sarah Fischer", "Michael Wolf", "Julia Meyer",
    "David Schulz", "Lisa Hoffmann", "Stefan Koch", "Nina Richter", "Frank Zimmermann",
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    name: names[i % names.length] + ` ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length] as User["role"],
    status: statuses[i % statuses.length] as User["status"],
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    department: departments[i % departments.length] as string,
    avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=40&h=40&fit=crop&crop=face`,
  }));
};

const roleColors = {
  admin: "bg-red-100 text-red-800 border-red-200",
  editor: "bg-blue-100 text-blue-800 border-blue-200",
  user: "bg-green-100 text-green-800 border-green-200",
  viewer: "bg-gray-100 text-gray-800 border-gray-200",
} as const;

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-red-100 text-red-800 border-red-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
} as const;

export function AdvancedUserTable() {
  const [data] = useState<User[]>(generateMockUsers());
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo(() => [
    // Selection column
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Alle auswählen"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Zeile auswählen"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),

    // Avatar and Name column
    columnHelper.accessor("name", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
            {row.original.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      ),
    }),

    columnHelper.accessor("role", {
      header: "Rolle",
      cell: ({ getValue }) => {
        const role = getValue();
        return (
          <Badge variant="outline" className={roleColors[role]}>
            {role === "admin" ? "Administrator" : 
             role === "editor" ? "Redakteur" :
             role === "user" ? "Benutzer" : "Betrachter"}
          </Badge>
        );
      },
    }),

    columnHelper.accessor("department", {
      header: "Abteilung",
      cell: ({ getValue }) => getValue(),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <Badge variant="outline" className={statusColors[status]}>
            {status === "active" ? "Aktiv" : 
             status === "inactive" ? "Inaktiv" : "Ausstehend"}
          </Badge>
        );
      },
    }),

    columnHelper.accessor("lastLogin", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Letzter Login
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      ),
      cell: ({ getValue }) => {
        const date = getValue();
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffInDays === 0) return "Heute";
        if (diffInDays === 1) return "Gestern";
        if (diffInDays < 7) return `vor ${diffInDays} Tagen`;
        return date.toLocaleDateString("de-DE");
      },
    }),

    // Actions column
    columnHelper.display({
      id: "actions",
      header: "Aktionen",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Aktionen öffnen</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Anzeigen
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Bearbeiten
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Löschen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
  ], []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
  });

  const exportData = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const dataToExport = selectedRows.length > 0 
      ? selectedRows.map(row => row.original)
      : table.getFilteredRowModel().rows.map(row => row.original);
    
    const csvContent = [
      Object.keys(dataToExport[0] || {}),
      ...dataToExport.map(row => Object.values(row))
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Erweiterte Benutzer-Tabelle</CardTitle>
        <CardDescription>
          Vollständige Tabellenfunktionalität mit Sortierung, Filterung, Paginierung und Aktionen
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Toolbar */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Suchen..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8 max-w-sm"
              />
            </div>
            
            <Select
              value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
              onValueChange={(value: string) =>
                table.getColumn("role")?.setFilterValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Rolle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Rollen</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="editor">Redakteur</SelectItem>
                <SelectItem value="user">Benutzer</SelectItem>
                <SelectItem value="viewer">Betrachter</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
              onValueChange={(value: string) =>
                table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="active">Aktiv</SelectItem>
                <SelectItem value="inactive">Inaktiv</SelectItem>
                <SelectItem value="pending">Ausstehend</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Spalten
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Spalten ein-/ausblenden</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuItem
                      key={column.id}
                      onClick={() => column.toggleVisibility(!column.getIsVisible())}
                    >
                      {column.getIsVisible() ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                      {column.id}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={exportData} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Hinzufügen
            </Button>
          </div>
        </div>

        {/* Selection Info */}
        {Object.keys(rowSelection).length > 0 && (
          <div className="flex items-center justify-between rounded-md bg-muted p-2 mb-4">
            <span className="text-sm text-muted-foreground">
              {Object.keys(rowSelection).length} von {table.getFilteredRowModel().rows.length} Zeilen ausgewählt
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Bearbeiten
              </Button>
              <Button variant="destructive" size="sm">
                Löschen
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="rounded-md border">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b transition-colors hover:bg-muted/50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    Keine Ergebnisse gefunden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Zeilen pro Seite</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value: string) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Seite {table.getState().pagination.pageIndex + 1} von{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Zeige {table.getRowModel().rows.length} von {table.getFilteredRowModel().rows.length} Einträgen
            ({data.length} insgesamt)
          </div>
          <div>
            {Object.keys(rowSelection).length > 0 && (
              <span>{Object.keys(rowSelection).length} ausgewählt</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
