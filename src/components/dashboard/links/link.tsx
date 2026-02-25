import { useEffect, useState } from "react";
import { columns, type Link } from "./column";
import { DataTable } from "./dataTable";

export default function LinkTable() {
  const [data, setData] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const result: Link[] = [
        {
          id: "1",
          name: "Product Launch",
          url: "https://example.com/product",
          shortUrl: "lnktr.ac/abc123",
          clicks: 1243,
          createdAt: "2026-02-01",
          status: "active",
        },
        {
          id: "2",
          name: "YouTube Campaign",
          url: "https://youtube.com/demo",
          shortUrl: "lnktr.ac/yt456",
          clicks: 842,
          createdAt: "2026-02-10",
          status: "active",
        },
      ];

      setData(result);
      setLoading(false);
    }

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
