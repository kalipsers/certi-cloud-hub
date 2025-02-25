
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User } from "@/types/user";

interface PermissionsManagerProps {
  permissions: User['permissions'];
  onChange: (permissions: User['permissions']) => void;
  isAdmin: boolean;
}

export function PermissionsManager({ permissions, onChange, isAdmin }: PermissionsManagerProps) {
  if (isAdmin) {
    return null;
  }

  const handlePermissionChange = (
    category: keyof NonNullable<User['permissions']>,
    permission: string,
    currentValue: boolean
  ) => {
    onChange({
      ...permissions,
      [category]: {
        ...permissions?.[category],
        [permission]: !currentValue,
      },
    });
  };

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

  const currentPermissions = permissions || defaultPermissions;

  const renderPermissionSection = (
    title: string,
    category: keyof typeof defaultPermissions,
    permissions: Record<string, boolean>
  ) => (
    <div className="space-y-4">
      <div className="text-sm font-medium">{title}</div>
      <div className="grid gap-4">
        {Object.entries(permissions).map(([key, value]) => (
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

  return (
    <div className="space-y-6">
      {renderPermissionSection('Certificates', 'certificates', currentPermissions.certificates)}
      {renderPermissionSection('Users', 'users', currentPermissions.users)}
      {renderPermissionSection('Clients', 'clients', currentPermissions.clients)}
      {renderPermissionSection('Applications', 'applications', currentPermissions.applications)}
    </div>
  );
}
