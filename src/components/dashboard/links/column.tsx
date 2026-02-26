import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "shortCode",
    header: "Short URL",
    cell: ({ row }) => {
      const BASE_URL = import.meta.env.VITE_APP_URL || window.location.origin;

      const shortUrl = `http://localhost:5000/${row.original.shortCode}`;
      const fullUrl = `${BASE_URL}/${row.original.shortCode}`;

      // Use the full URL for the link
      // Use the short URL for display
      return (
        <a
          href={shortUrl}
          target="_blank"
          className="text-blue-600 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {fullUrl}
        </a>
      );
    },
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.original.isActive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];
