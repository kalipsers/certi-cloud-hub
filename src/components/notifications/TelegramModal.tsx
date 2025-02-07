
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

interface TelegramModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TelegramModal = ({ open, onOpenChange }: TelegramModalProps) => {
  const [chatId, setChatId] = useState("");

  const handleGetChatId = () => {
    // This would typically open a link to the Telegram bot
    window.open("https://t.me/username_to_id_bot", "_blank");
  };

  const handleTest = () => {
    if (!chatId) {
      toast.error("Please enter a chat ID first");
      return;
    }
    toast.success("Test message sent to Telegram");
  };

  const handleSave = () => {
    if (!chatId) {
      toast.error("Please enter a chat ID first");
      return;
    }
    toast.success("Telegram notifications configured successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Telegram Notifications</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Button onClick={handleGetChatId}>Get Telegram Chat ID</Button>
          </div>
          <div className="grid gap-2">
            <Input
              placeholder="Enter Chat ID"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
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
