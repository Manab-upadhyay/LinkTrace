"use client";

import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Link = {
  id: string;
  name: string;
  url: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  status: "active" | "expired";
};

export const columns: ColumnDef<Link>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Link Name</div>,
    cell: ({ row }) => (
      <div className="font-medium text-left">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "shortUrl",
    header: () => <div className="text-left">Short URL</div>,
    cell: ({ row }) => (
      <div className="font-mono text-sm text-muted-foreground text-left">
        {row.getValue("shortUrl")}
      </div>
    ),
  },
  {
    accessorKey: "clicks",
    header: () => <div className="text-right">Clicks</div>,
    cell: ({ row }) => (
      <div className="text-right px-2">{row.getValue("clicks")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="text-center px-2">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created</div>,
  },
];
