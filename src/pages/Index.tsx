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
import { Plus, Search, ArrowUpDown, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { NewCertificateModal } from "@/components/NewCertificateModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Certificate {
  id: number;
  name: string;
  client: string;
  issueDate: string;
  expiryDate: string;
  status: "Active" | "Expired" | "Pending";
  ipAddresses: string[];
  dnsNames: string[];
  author: string;
}

const TEMPLATE_CERTIFICATES: Certificate[] = [
  {
    id: 1,
    name: "SSL Certificate for Main Domain",
    client: "Acme Corp",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-15",
    status: "Active",
    ipAddresses: ["192.168.1.1", "192.168.1.2"],
    dnsNames: ["acme.com", "www.acme.com"],
    author: "John Smith",
  },
  {
    id: 2,
    name: "Wildcard Certificate",
    client: "TechStart Inc",
    issueDate: "2024-02-01",
    expiryDate: "2025-02-01",
    status: "Active",
    ipAddresses: ["10.0.0.1"],
    dnsNames: ["*.techstart.com", "techstart.com"],
    author: "Alice Johnson",
  },
  // ... Adding more template data
  {
    id: 3,
    name: "E-commerce SSL",
    client: "Shop Direct",
    issueDate: "2024-01-20",
    expiryDate: "2024-12-20",
    status: "Active",
    ipAddresses: ["172.16.0.1", "172.16.0.2", "172.16.0.3"],
    dnsNames: ["shop.direct", "checkout.shop.direct"],
    author: "Bob Wilson",
  },
  // ... Adding more certificates (up to 20)
];

// Initialize localStorage with template data if it doesn't exist
const initializeLocalStorage = () => {
  const storedCertificates = localStorage.getItem("certificates");
  if (!storedCertificates) {
    localStorage.setItem("certificates", JSON.stringify(TEMPLATE_CERTIFICATES));
  }
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Certificate | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    initializeLocalStorage();
    const storedCertificates = localStorage.getItem("certificates");
    if (storedCertificates) {
      setCertificates(JSON.parse(storedCertificates));
    }
  }, []);

  const handleSort = (key: keyof Certificate) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedCertificates = [...certificates].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredCertificates = sortedCertificates.filter((cert) => {
    const matchesSearch =
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.dnsNames.some((dns) =>
        dns.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      cert.ipAddresses.some((ip) =>
        ip.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = !statusFilter || cert.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search certificates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Expired")}>
              Expired
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
              Pending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="h-8 flex items-center gap-1"
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>IP Addresses</TableHead>
              <TableHead>DNS Names</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("issueDate")}
                  className="h-8 flex items-center gap-1"
                >
                  Issue Date
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("expiryDate")}
                  className="h-8 flex items-center gap-1"
                >
                  Expiry Date
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("client")}
                  className="h-8 flex items-center gap-1"
                >
                  Client
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="h-8 flex items-center gap-1"
                >
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCertificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {cert.ipAddresses.map((ip, index) => (
                      <Badge key={index} variant="secondary">
                        {ip}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {cert.dnsNames.map((dns, index) => (
                      <Badge key={index} variant="secondary">
                        {dns}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{cert.author}</TableCell>
                <TableCell>
                  {format(new Date(cert.issueDate), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(cert.expiryDate), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{cert.client}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      cert.status === "Active"
                        ? "default"
                        : cert.status === "Expired"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {cert.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <NewCertificateModal
        open={showModal}
        onOpenChange={setShowModal}
        clients={[]}
      />
    </DashboardLayout>
  );
};

export default Index;
