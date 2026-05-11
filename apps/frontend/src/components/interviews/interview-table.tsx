"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { columns } from "./interview-columns";
import type { Interview } from "@/types/interview";
import { ChevronDown, ChevronUp } from "lucide-react";

interface InterviewTableProps {
  data: Interview[];
  onRowClick: (interview: Interview) => void;
}

export function InterviewTable({ data, onRowClick }: InterviewTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="w-full bg-card border shadow-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto hidden-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 border-b text-xs text-muted-foreground uppercase font-extrabold tracking-wider">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`px-5 py-4 whitespace-nowrap ${header.column.getCanSort() ? "cursor-pointer select-none hover:bg-muted/50" : ""}`}
                  >
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ChevronUp className="h-3 w-3" />,
                        desc: <ChevronDown className="h-3 w-3" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer group"
                onClick={() => onRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/10">
        <div className="text-sm text-muted-foreground font-medium">
          Showing <span className="text-foreground font-bold">{table.getRowModel().rows.length}</span> of <span className="text-foreground font-bold">{data.length}</span> interviews
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1.5 text-sm font-bold rounded-lg border bg-card hover:bg-muted disabled:opacity-50 transition-colors shadow-sm"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1.5 text-sm font-bold rounded-lg border bg-card hover:bg-muted disabled:opacity-50 transition-colors shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
