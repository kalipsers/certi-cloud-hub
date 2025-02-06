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
import { NewCertificateModal } from "@/components/NewCertificateModal";

const MOCK_CERTIFICATES = [
  {
    id: 1,
    name: "SSL Certificate",
    client: "Acme Corp",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Digital Signature",
    client: "TechStart Inc",
    issueDate: "2024-02-01",
    expiryDate: "2025-02-01",
    status: "Active",
  },
];

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

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredCertificates = MOCK_CERTIFICATES.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Certificates</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor your certificates
          </p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => setShowModal(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Certificate
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search certificates..."
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
              <TableHead>Client</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCertificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.name}</TableCell>
                <TableCell>{cert.client}</TableCell>
                <TableCell>{cert.issueDate}</TableCell>
                <TableCell>{cert.expiryDate}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                    {cert.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <NewCertificateModal
        open={showModal}
        onOpenChange={setShowModal}
        clients={MOCK_CLIENTS}
      />
    </DashboardLayout>
  );
};

export default Index;