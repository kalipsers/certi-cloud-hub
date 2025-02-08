
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Manager User",
    email: "manager@example.com",
    role: "Manager",
    status: "Active",
  },
];
