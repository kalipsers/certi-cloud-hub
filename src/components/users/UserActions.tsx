
import { Button } from "@/components/ui/button";
import { Edit, RefreshCw, Trash2 } from "lucide-react";

interface UserActionsProps {
  userId: number;
  onEdit: (id: number) => void;
  onReset: (id: number) => void;
  onDelete: (id: number) => void;
}

export function UserActions({ userId, onEdit, onReset, onDelete }: UserActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEdit(userId)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onReset(userId)}
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDelete(userId)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
