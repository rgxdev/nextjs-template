"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly status: "active" | "inactive";
}

const columnHelper = createColumnHelper<User>();

const columns = [
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
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "E-Mail",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Rolle",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span
        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
          info.getValue() === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {info.getValue() === "active" ? "Aktiv" : "Inaktiv"}
      </span>
    ),
  }),
];

const mockData: readonly User[] = [
  {
    id: "1",
    name: "Max Mustermann",
    email: "max@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Maria Schmidt",
    email: "maria@example.com",
    role: "User",
    status: "active",
  },
  {
    id: "3",
    name: "Hans Weber",
    email: "hans@example.com",
    role: "Editor",
    status: "inactive",
  },
  {
    id: "4",
    name: "Anna Müller",
    email: "anna@example.com",
    role: "User",
    status: "active",
  },
] as const;

export function UserTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">
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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Zeige {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} bis{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getRowCount()
          )}{" "}
          von {table.getRowCount()} Einträgen
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Vorherige
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Nächste
          </Button>
        </div>
      </div>
    </div>
  );
}
