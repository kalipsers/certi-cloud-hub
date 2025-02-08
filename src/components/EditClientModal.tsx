
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EditClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: {
    id: number;
    name: string;
    contact: string;
    email: string;
  };
}

export function EditClientModal({ open, onOpenChange, client }: EditClientModalProps) {
  const [clientName, setClientName] = useState(client?.name || "");
  const [contactName, setContactName] = useState(client?.contact || "");
  const [contactEmail, setContactEmail] = useState(client?.email || "");
  const [contactPhone, setContactPhone] = useState("");
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const generateApiKey = () => {
    const key = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setApiKey(key);
    toast({
      title: "API Key Generated",
      description: "New API key has been generated for the client.",
    });
  };

  const handleSubmit = async () => {
    // Simulate backend request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Client Updated",
      description: "Client information has been successfully updated.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Person Name</Label>
            <Input
              id="contactName"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex gap-2">
              <Input id="apiKey" value={apiKey} readOnly />
              <Button onClick={generateApiKey}>Generate</Button>
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Update Client
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
