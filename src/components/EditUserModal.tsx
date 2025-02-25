
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PermissionsManager } from "./users/PermissionsManager";
import { User } from "@/types/user";

interface EditUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
}

const defaultPermissions: NonNullable<User['permissions']> = {
  certificates: {
    create: false,
    delete: false,
    invalidate: false,
    extend: false,
  },
  users: {
    create: false,
    delete: false,
    edit: false,
    changePassword: false,
  },
  clients: {
    add: false,
    delete: false,
    edit: false,
    manageApiKeys: false,
  },
  applications: {
    add: false,
    delete: false,
    edit: false,
  },
};

export function EditUserModal({ open, onOpenChange, user }: EditUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [permissions, setPermissions] = useState(defaultPermissions);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
      setPermissions(user.permissions || defaultPermissions);
    }
  }, [user]);

  const handleSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "User Updated",
      description: "User information has been successfully updated.",
    });
    onOpenChange(false);
  };

  const isAdmin = role === "Admin";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {!isAdmin && (
            <PermissionsManager
              permissions={permissions}
              onChange={setPermissions}
              isAdmin={isAdmin}
            />
          )}

          <Button onClick={handleSubmit} className="w-full">
            Update User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
