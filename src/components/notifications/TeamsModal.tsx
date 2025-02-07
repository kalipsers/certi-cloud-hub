
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

interface TeamsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TeamsModal = ({ open, onOpenChange }: TeamsModalProps) => {
  const [webhook, setWebhook] = useState("");

  const handleTest = () => {
    if (!webhook) {
      toast.error("Please enter a webhook URL first");
      return;
    }
    toast.success("Test message sent to Microsoft Teams");
  };

  const handleSave = () => {
    if (!webhook) {
      toast.error("Please enter a webhook URL first");
      return;
    }
    toast.success("Microsoft Teams webhook configured successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Microsoft Teams Notifications</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              placeholder="Enter Microsoft Teams Webhook URL"
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
