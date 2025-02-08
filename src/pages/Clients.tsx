import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { NewClientModal } from "@/components/NewClientModal";
import { EditClientModal } from "@/components/EditClientModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const MOCK_CLIENTS = [
  {
    id: 1,
    name: "Acme Corp",
    contact: "John Doe",
    email: "john@acme.com",
    certificates: 3,
  },
  {
    id: 2,
    name: "TechStart Inc",
    contact: "Jane Smith",
    email: "jane@techstart.com",
    certificates: 1,
  },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const { toast } = useToast();

  const selectedClient = clients.find(client => client.id === selectedClientId);

  const handleEditClick = (id: number) => {
    setSelectedClientId(id);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedClientId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedClientId) return;
    
    const client = clients.find(c => c.id === selectedClientId);
    if (client?.certificates && client.certificates > 0) {
      toast({
        title: "Cannot Delete Client",
        description: "This client has active certificates. Please remove all certificates before deleting.",
        variant: "destructive",
      });
      setShowDeleteModal(false);
      return;
    }

    // Simulate backend request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setClients(prevClients => prevClients.filter(c => c.id !== selectedClientId));
    setShowDeleteModal(false);
    toast({
      title: "Client Deleted",
      description: "The client has been successfully deleted.",
    });
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Clients</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your client information
          </p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => setShowModal(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Client
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Certificates</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.contact}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.certificates}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(client.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(client.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <NewClientModal open={showModal} onOpenChange={setShowModal} />
      <EditClientModal 
        open={showEditModal} 
        onOpenChange={setShowEditModal}
        client={selectedClient}
      />

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Client</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this client? This action cannot be undone.
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

export default Clients;
