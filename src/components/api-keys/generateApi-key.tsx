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

export function GenerateKeyDialog() {
  const [keyName, setKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const handleGenerate = async () => {
    // Call your backend here
    const fakeKey = "lt_live_92ks82hs8sks82ks";
    setGeneratedKey(fakeKey);
  };

  return (
    <Dialog>
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

            <Button className="w-full">Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
