
import { useState, useEffect } from 'react';

interface Permissions {
  createCertificate: boolean;
  renewCertificate: boolean;
  viewCertificates: boolean;
  invalidateCertificate: boolean;
  deleteCertificate: boolean;
}

interface User {
  role: string;
  permissions?: Permissions;
}

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<Permissions | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem('authenticated_user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      setIsAdmin(user.role === 'Admin');
      setPermissions(user.permissions || null);
    }
  }, []);

  const can = (action: keyof Permissions) => {
    if (isAdmin) return true;
    return permissions ? permissions[action] : false;
  };

  return {
    can,
    isAdmin,
  };
};
