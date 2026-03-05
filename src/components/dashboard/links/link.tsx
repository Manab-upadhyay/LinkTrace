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
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export default function LinkTable({
  data,
  handleDeleteLink,
  totalCount,
  currentPage,
  onPageChange,
}: LinkTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No links available</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground text-balance">
            You haven&apos;t created any links yet. Create your first short link to start tracking clicks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <DataTable
        columns={columns}
        data={data}
        handleDeleteLink={handleDeleteLink}
        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
