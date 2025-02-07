
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

interface EmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EmailModal = ({ open, onOpenChange }: EmailModalProps) => {
  const [email, setEmail] = useState("");

  const handleTest = () => {
    if (!email) {
      toast.error("Please enter an email address first");
      return;
    }
    toast.success("Test email sent");
  };

  const handleSave = () => {
    if (!email) {
      toast.error("Please enter an email address first");
      return;
    }
    toast.success("Email notifications configured successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Email Notifications</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
