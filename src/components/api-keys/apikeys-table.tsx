import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

const dummyKeys = [
  {
    id: "1",
    name: "Production",
    prefix: "lt_live_x82ks...",
    createdAt: "2026-02-01",
    status: "Active",
  },
];

export function ApiKeysTable() {
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
          {dummyKeys.map((key) => (
            <TableRow key={key.id}>
              <TableCell>{key.name}</TableCell>
              <TableCell className="font-mono text-sm">{key.prefix}</TableCell>
              <TableCell>{key.createdAt}</TableCell>
              <TableCell>{key.status}</TableCell>
              <TableCell className="text-right">
                <Button variant="destructive" size="sm">
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
