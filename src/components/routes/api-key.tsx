import { GenerateKeyDialog } from "../api-keys/generateApi-key";
import { ApiKeysTable } from "../api-keys/apikeys-table";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/service/apiService";
import { ConfirmDialog } from "../layout/DialogBox";
import { useState } from "react";
import TableSkeleton from "../skeleton/TableSkeleton";

export default function ApiKeysPage() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["apiKeys"],
    queryFn: () => apiService.getApiKeys().then((res) => res.data),
  });
  console.log("API Keys Data:", data);
  const generateApiKeyMutation = useMutation({
    mutationFn: (name: string) =>
      apiService.generateApiKey(name).then((res) => res.data),
    onSuccess: () => {
      // Invalidate and refetch API keys after generating a new one
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
    },
    onError: () => {
      alert("Error generating API key");
    },
  });
  const deleteApiKeyMutation = useMutation({
    mutationFn: (keyId: string) => apiService.deleteApiKey(keyId),
    onSuccess: () => {
      // Invalidate and refetch API keys after deletion
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
    },
    onError: () => {
      alert("Error deleting API key");
    },
  });
  async function handleGenerateApiKey(name: string) {
    const result = await generateApiKeyMutation.mutateAsync(name);
    console.log("Generated API Key Result:", result);
    if (result.error) {
      alert("Error generating API key: " + result.error);
    } else {
      return {
        fullKey: result.fullKey,
      }; // Return the generated key and prefix
    }
  }
  function handleDeleteApiKey(keyId: string) {
    setKeyToDelete(keyId);
    setShowDeleteAlert(true);
  }

  if (isLoading) {
    return <TableSkeleton/>
  }
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

        <GenerateKeyDialog generateApiKey={handleGenerateApiKey} />
      </div>

      {/* Table */}
      <ApiKeysTable
        data={data.apiKeys}
        handdleRevokeApiKey={handleDeleteApiKey}
      />
      <ConfirmDialog
        open={showDeleteAlert}
        title="Revoke API Key"
        description="Are you sure you want to revoke this API key? This action cannot be undone."
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={() => {
          if (keyToDelete) {
            deleteApiKeyMutation.mutate(keyToDelete);
            setKeyToDelete(null);
          }
        }}
      />
    </div>
  );
}
