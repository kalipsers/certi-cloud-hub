
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TelegramModal } from "@/components/notifications/TelegramModal";
import { DiscordWebhookModal } from "@/components/notifications/DiscordWebhookModal";
import { EmailModal } from "@/components/notifications/EmailModal";
import { TeamsModal } from "@/components/notifications/TeamsModal";

const NotificationSettings = () => {
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showTeamsModal, setShowTeamsModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Notification Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure your notification preferences
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" /> Add Notification
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setShowTelegramModal(true)}>
              Telegram
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowDiscordModal(true)}>
              Discord Webhook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowEmailModal(true)}>
              Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowTeamsModal(true)}>
              Microsoft Teams
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TelegramModal open={showTelegramModal} onOpenChange={setShowTelegramModal} />
      <DiscordWebhookModal
        open={showDiscordModal}
        onOpenChange={setShowDiscordModal}
      />
      <EmailModal open={showEmailModal} onOpenChange={setShowEmailModal} />
      <TeamsModal open={showTeamsModal} onOpenChange={setShowTeamsModal} />
    </DashboardLayout>
  );
};

export default NotificationSettings;
