
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  permissions?: {
    createCertificate: boolean;
    renewCertificate: boolean;
    viewCertificates: boolean;
    invalidateCertificate: boolean;
    deleteCertificate: boolean;
  };
}

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
    permissions: {
      createCertificate: true,
      renewCertificate: true,
      viewCertificates: true,
      invalidateCertificate: true,
      deleteCertificate: true,
    },
  },
  {
    id: 2,
    name: "Manager User",
    email: "manager@example.com",
    role: "Manager",
    status: "Active",
    permissions: {
      createCertificate: true,
      renewCertificate: true,
      viewCertificates: true,
      invalidateCertificate: false,
      deleteCertificate: false,
    },
  },
];
