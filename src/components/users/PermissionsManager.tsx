
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Permission {
  createCertificate: boolean;
  renewCertificate: boolean;
  viewCertificates: boolean;
  invalidateCertificate: boolean;
  deleteCertificate: boolean;
}

interface PermissionsManagerProps {
  permissions: Permission;
  onChange: (permissions: Permission) => void;
  isAdmin: boolean;
}

export function PermissionsManager({ permissions, onChange, isAdmin }: PermissionsManagerProps) {
  if (isAdmin) {
    return null; // Don't show permissions for admin users
  }

  const handlePermissionChange = (key: keyof Permission) => {
    onChange({
      ...permissions,
      [key]: !permissions[key],
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Permissions</div>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="createCertificate">Create Certificate</Label>
          <Switch
            id="createCertificate"
            checked={permissions.createCertificate}
            onCheckedChange={() => handlePermissionChange("createCertificate")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="renewCertificate">Renew Certificate</Label>
          <Switch
            id="renewCertificate"
            checked={permissions.renewCertificate}
            onCheckedChange={() => handlePermissionChange("renewCertificate")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="viewCertificates">View Certificates</Label>
          <Switch
            id="viewCertificates"
            checked={permissions.viewCertificates}
            onCheckedChange={() => handlePermissionChange("viewCertificates")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="invalidateCertificate">Invalidate Certificate</Label>
          <Switch
            id="invalidateCertificate"
            checked={permissions.invalidateCertificate}
            onCheckedChange={() => handlePermissionChange("invalidateCertificate")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="deleteCertificate">Delete Certificate</Label>
          <Switch
            id="deleteCertificate"
            checked={permissions.deleteCertificate}
            onCheckedChange={() => handlePermissionChange("deleteCertificate")}
          />
        </div>
      </div>
    </div>
  );
}
