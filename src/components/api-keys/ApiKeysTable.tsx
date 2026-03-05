import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

interface ApiKeysTableProps {
  data: {
    _id: string;
    name: string;
    prefix: string;
    createdAt: string;
    isActive: boolean;
  }[];
  handdleRevokeApiKey: (keyId: string) => void;
}
export function ApiKeysTable({ data, handdleRevokeApiKey }: ApiKeysTableProps) {

  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No API keys found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground text-balance">
            You haven&apos;t created any API keys yet. Create your first key to start authenticating your requests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Key Prefix</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((key) => (
            <TableRow key={key._id}>
              <TableCell>{key.name}</TableCell>
              <TableCell className="font-mono text-sm">{key.prefix}</TableCell>
              <TableCell>{key.createdAt}</TableCell>
              <TableCell>{key.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handdleRevokeApiKey(key._id)}
                >
                  Revoke
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
