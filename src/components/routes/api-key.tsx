import { GenerateKeyDialog } from "../api-keys/generateApi-key";
import { ApiKeysTable } from "../api-keys/apikeys-table";

export default function ApiKeysPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">API Keys</h1>
          <p className="text-muted-foreground text-sm">
            Manage your developer API keys securely.
          </p>
        </div>

        <GenerateKeyDialog />
      </div>

      {/* Table */}
      <ApiKeysTable />
    </div>
  );
}
