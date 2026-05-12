"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { columns } from "./candidate-columns";
import type { Candidate } from "@/types/candidate";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useCandidateStore } from "@/features/candidates/store/candidate-store";

interface CandidateTableProps {
  data: Candidate[];
  totalCount: number;
  onRowClick: (candidate: Candidate) => void;
}

export function CandidateTable({ data, totalCount, onRowClick }: CandidateTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = useCandidateStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  const totalPages = Math.ceil(totalCount / pagination.pageSize);
  const startIdx = (pagination.page - 1) * pagination.pageSize + 1;
  const endIdx = Math.min(pagination.page * pagination.pageSize, totalCount);

  return (
    <div className="w-full">
      <div className="bg-card border shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto hidden-scrollbar">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b text-[10px] text-muted-foreground uppercase font-black tracking-widest">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`px-4 py-4 whitespace-nowrap ${header.column.getCanSort() ? "cursor-pointer select-none hover:bg-muted/50" : ""}`}
                      >
                        <div className="flex items-center gap-1.5">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ChevronUp className="h-3 w-3" />,
                            desc: <ChevronDown className="h-3 w-3" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-muted/30 transition-colors group cursor-pointer"
                    onClick={() => onRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-sm font-bold uppercase tracking-widest">No candidates found</p>
                      <p className="text-xs font-medium">Try adjusting your filters or search query</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/10">
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              Showing <span className="text-foreground">{totalCount > 0 ? startIdx : 0}-{endIdx}</span> of <span className="text-foreground">{totalCount}</span> candidates
            </div>
            <div className="h-4 w-px bg-border mx-2" />
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Rows per page</label>
              <select 
                value={pagination.pageSize}
                onChange={(e) => setPagination({ pageSize: parseInt(e.target.value), page: 1 })}
                className="h-8 px-2 rounded-lg border bg-card text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {[10, 20, 30, 50].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-2">
              Page <span className="text-foreground">{pagination.page}</span> of <span className="text-foreground">{totalPages || 1}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPagination({ page: pagination.page - 1 })}
                disabled={pagination.page === 1}
                className="p-1.5 rounded-lg border bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPagination({ page: pagination.page + 1 })}
                disabled={pagination.page >= totalPages}
                className="p-1.5 rounded-lg border bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
