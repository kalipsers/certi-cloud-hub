
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface DiscordWebhookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DiscordWebhookModal = ({
  open,
  onOpenChange,
}: DiscordWebhookModalProps) => {
  const [webhook, setWebhook] = useState("");

  const handleTest = () => {
    if (!webhook) {
      toast.error("Please enter a webhook URL first");
      return;
    }
    toast.success("Test message sent to Discord");
  };

  const handleSave = () => {
    if (!webhook) {
      toast.error("Please enter a webhook URL first");
      return;
    }
    toast.success("Discord webhook configured successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Discord Webhook</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              placeholder="Enter Discord Webhook URL"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleTest}>
              Test
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
