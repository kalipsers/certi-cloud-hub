
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NewUserModal } from "@/components/NewUserModal";
import { EditUserModal } from "@/components/EditUserModal";
import { ResetPasswordModal } from "@/components/ResetPasswordModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { MOCK_USERS } from "@/types/user";
import { UsersTable } from "@/components/users/UsersTable";
import { SearchBar } from "@/components/users/SearchBar";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState(MOCK_USERS);
  const { toast } = useToast();

  const selectedUser = users.find(user => user.id === selectedUserId);

  const handleEditClick = (id: number) => {
    setSelectedUserId(id);
    setShowEditModal(true);
  };

  const handleResetClick = (id: number) => {
    setSelectedUserId(id);
    setShowResetModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;
    // Simulate backend request
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUserId));
    setShowDeleteModal(false);
    toast({
      title: "User Deleted",
      description: "The user has been successfully deleted.",
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage system users and their permissions
          </p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => setShowModal(true)}>
          <Plus className="mr-2 h-4 w-4" /> New User
        </Button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <UsersTable
        users={filteredUsers}
        onEdit={handleEditClick}
        onReset={handleResetClick}
        onDelete={handleDeleteClick}
      />

      <NewUserModal open={showModal} onOpenChange={setShowModal} />

      <EditUserModal 
        open={showEditModal} 
        onOpenChange={setShowEditModal}
        user={selectedUser}
      />

      <ResetPasswordModal
        open={showResetModal}
        onOpenChange={setShowResetModal}
        userId={selectedUserId ?? undefined}
      />

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Users;
