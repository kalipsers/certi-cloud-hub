
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
    checked: boolean
  ) => {
    if (!currentPermissions) return;
    
    onChange({
      ...currentPermissions,
      [category]: {
        ...currentPermissions[category],
        [permission]: checked,
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
      <div className="space-y-2">
        <h4 className="font-medium">{title}</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(sectionPermissions).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`${category}-${key}`}
                checked={value}
                onCheckedChange={(checked) => 
                  handlePermissionChange(category, key, checked as boolean)
                }
              />
              <Label htmlFor={`${category}-${key}`}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </Label>
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

