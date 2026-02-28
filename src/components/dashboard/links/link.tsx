import { columns } from "./column";
import { DataTable } from "./dataTable";
interface Link {
  id: string;
  name: string;
  url: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  status: "active" | "expired";
}
interface LinkTableProps {
  data: Link[];
  handleDeleteLink: (id: string) => void;
}
export default function LinkTable({ data, handleDeleteLink }: LinkTableProps) {
  console.log("Link Table Data:", data);
  if (!data || data.length === 0) return <div>No links available.</div>;

  return (
    <div className="container mx-auto py-6">
      <DataTable
        columns={columns}
        data={data}
        handleDeleteLink={handleDeleteLink}
      />
    </div>
  );
}
