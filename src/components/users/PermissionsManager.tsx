
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User } from "@/types/user";

interface PermissionsManagerProps {
  permissions: User['permissions'];
  onChange: (permissions: User['permissions']) => void;
  isAdmin: boolean;
}

export function PermissionsManager({ permissions, onChange, isAdmin }: PermissionsManagerProps) {
  // Return early if admin, showing no permissions interface
  if (isAdmin) {
    return null;
  }

  const defaultPermissions = {
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

  // Ensure we always have a valid permissions object
  const currentPermissions = permissions || defaultPermissions;

  const handlePermissionChange = (
    category: keyof typeof defaultPermissions,
    permission: string,
    currentValue: boolean
  ) => {
    if (!currentPermissions) return;
    
    onChange({
      ...currentPermissions,
      [category]: {
        ...currentPermissions[category],
        [permission]: !currentValue,
      },
    });
  };

  const renderPermissionSection = (
    title: string,
    category: keyof typeof defaultPermissions,
    sectionPermissions: Record<string, boolean>
  ) => {
    if (!sectionPermissions) return null;
    
    return (
      <div className="space-y-4">
        <div className="text-sm font-medium">{title}</div>
        <div className="grid gap-4">
          {Object.entries(sectionPermissions).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`${category}-${key}`}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </Label>
              <Switch
                id={`${category}-${key}`}
                checked={value}
                onCheckedChange={() => handlePermissionChange(category, key, value)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderPermissionSection('Certificates', 'certificates', currentPermissions.certificates)}
      {renderPermissionSection('Users', 'users', currentPermissions.users)}
      {renderPermissionSection('Clients', 'clients', currentPermissions.clients)}
      {renderPermissionSection('Applications', 'applications', currentPermissions.applications)}
    </div>
  );
}
