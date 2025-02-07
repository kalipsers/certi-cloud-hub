
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface NewUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewUserModal({ open, onOpenChange }: NewUserModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [permissions, setPermissions] = useState({
    certificates: {
      create: false,
      invalidate: false,
      delete: false,
      extend: false,
    },
    users: {
      create: false,
      edit: false,
      delete: false,
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
  });

  const generateUsername = () => {
    if (firstName && lastName) {
      const generated = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
      setUsername(generated);
    }
  };

  const handleSubmit = () => {
    // Handle user creation logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="space-y-4">
            <div className="space-y-4">
              <div className="grid w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="account" className="space-y-4">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <div className="flex gap-2">
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Button onClick={generateUsername}>Generate</Button>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="repeatPassword">Repeat Password</Label>
                <Input
                  id="repeatPassword"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="permissions" className="space-y-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-medium">Certificates</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cert-create"
                      checked={permissions.certificates.create}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          certificates: {
                            ...permissions.certificates,
                            create: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="cert-create">Create</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cert-invalidate"
                      checked={permissions.certificates.invalidate}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          certificates: {
                            ...permissions.certificates,
                            invalidate: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="cert-invalidate">Invalidate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cert-delete"
                      checked={permissions.certificates.delete}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          certificates: {
                            ...permissions.certificates,
                            delete: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="cert-delete">Delete</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cert-extend"
                      checked={permissions.certificates.extend}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          certificates: {
                            ...permissions.certificates,
                            extend: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="cert-extend">Extend</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Users</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="users-create"
                      checked={permissions.users.create}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          users: {
                            ...permissions.users,
                            create: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="users-create">Create</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="users-edit"
                      checked={permissions.users.edit}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          users: {
                            ...permissions.users,
                            edit: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="users-edit">Edit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="users-delete"
                      checked={permissions.users.delete}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          users: {
                            ...permissions.users,
                            delete: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="users-delete">Delete</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="users-password"
                      checked={permissions.users.changePassword}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          users: {
                            ...permissions.users,
                            changePassword: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="users-password">Change Password</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Clients</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clients-add"
                      checked={permissions.clients.add}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          clients: {
                            ...permissions.clients,
                            add: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="clients-add">Add</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clients-delete"
                      checked={permissions.clients.delete}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          clients: {
                            ...permissions.clients,
                            delete: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="clients-delete">Delete</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clients-edit"
                      checked={permissions.clients.edit}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          clients: {
                            ...permissions.clients,
                            edit: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="clients-edit">Edit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clients-api"
                      checked={permissions.clients.manageApiKeys}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          clients: {
                            ...permissions.clients,
                            manageApiKeys: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="clients-api">Manage API Keys</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Applications</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="apps-add"
                      checked={permissions.applications.add}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          applications: {
                            ...permissions.applications,
                            add: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="apps-add">Add</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="apps-delete"
                      checked={permissions.applications.delete}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          applications: {
                            ...permissions.applications,
                            delete: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="apps-delete">Delete</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="apps-edit"
                      checked={permissions.applications.edit}
                      onCheckedChange={(checked) =>
                        setPermissions({
                          ...permissions,
                          applications: {
                            ...permissions.applications,
                            edit: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="apps-edit">Edit</Label>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Create User
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
