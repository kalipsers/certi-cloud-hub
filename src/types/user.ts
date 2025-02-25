
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  permissions?: {
    certificates: {
      create: boolean;
      delete: boolean;
      invalidate: boolean;
      extend: boolean;
    };
    users: {
      create: boolean;
      delete: boolean;
      edit: boolean;
      changePassword: boolean;
    };
    clients: {
      add: boolean;
      delete: boolean;
      edit: boolean;
      manageApiKeys: boolean;
    };
    applications: {
      add: boolean;
      delete: boolean;
      edit: boolean;
    };
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
      certificates: {
        create: true,
        delete: true,
        invalidate: true,
        extend: true,
      },
      users: {
        create: true,
        delete: true,
        edit: true,
        changePassword: true,
      },
      clients: {
        add: true,
        delete: true,
        edit: true,
        manageApiKeys: true,
      },
      applications: {
        add: true,
        delete: true,
        edit: true,
      },
    },
  },
  {
    id: 2,
    name: "Manager User",
    email: "manager@example.com",
    role: "Manager",
    status: "Active",
    permissions: {
      certificates: {
        create: true,
        delete: false,
        invalidate: true,
        extend: true,
      },
      users: {
        create: false,
        delete: false,
        edit: true,
        changePassword: false,
      },
      clients: {
        add: true,
        delete: false,
        edit: true,
        manageApiKeys: true,
      },
      applications: {
        add: true,
        delete: false,
        edit: true,
      },
    },
  },
];
