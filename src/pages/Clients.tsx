
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
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { NewClientModal } from "@/components/NewClientModal";

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

  const filteredClients = MOCK_CLIENTS.filter(
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.contact}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.certificates}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <NewClientModal open={showModal} onOpenChange={setShowModal} />
    </DashboardLayout>
  );
};

export default Clients;
