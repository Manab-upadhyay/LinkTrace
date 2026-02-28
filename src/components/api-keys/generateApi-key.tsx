import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Key } from "lucide-react";
import { useState } from "react";

export function GenerateKeyDialog({
  generateApiKey,
}: {
  generateApiKey: (
    name: string,
  ) => Promise<{ keyHash: string; prefix: string }>;
}) {
  const [keyName, setKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleGenerate = async () => {
    if (!keyName.trim()) return;

    try {
      const key = await generateApiKey(keyName);
      setGeneratedKey(key.fullKey);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDone = () => {
    setOpen(false);
    setKeyName("");
    setGeneratedKey(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Generate Key
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
        </DialogHeader>

        {!generatedKey ? (
          <div className="space-y-4 py-4">
            <Input
              placeholder="Key name (e.g. Production)"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
            />

            <Button className="w-full" onClick={handleGenerate}>
              Generate
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <Alert>
              <Key className="h-4 w-4" />
              <AlertDescription>
                Copy your API key now. You won’t be able to see it again.
              </AlertDescription>
            </Alert>

            <Input value={generatedKey} readOnly />

            <Button className="w-full" onClick={handleDone}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
