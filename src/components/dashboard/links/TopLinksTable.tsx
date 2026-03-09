import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopLink {
  _id: string;
  url: string;
  name: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

interface TopLinksTableProps {
  topLinks?: TopLink[];
}

export default function TopLinksTable({ topLinks }: TopLinksTableProps) {
  if (!topLinks || topLinks.length === 0) {
    return null;
  }

  const BASE_URL = import.meta.env.VITE_APP_URL || window.location.origin;
  const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

  return (
    <div className="bg-card border rounded-xl overflow-hidden mt-6">
      <div className="p-6 pb-2">
        <h2 className="text-lg font-semibold mb-2">Top Performing Links</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6">Name</TableHead>
            <TableHead>Short URL</TableHead>
            <TableHead className="text-right pr-6">Clicks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topLinks.map((link) => {
            const shortUrl = `${REDIRECT_URL}/${link.shortCode}`;
            const fullUrl = `${BASE_URL}/${link.shortCode}`;
            
            return (
              <TableRow key={link._id}>
                <TableCell className="font-medium pl-6">{link.name}</TableCell>
                <TableCell>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    {fullUrl}
                  </a>
                </TableCell>
                <TableCell className="text-right font-semibold pr-6">
                  {link.clicks.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
