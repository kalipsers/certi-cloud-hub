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
import { Plus, Search, ArrowUpDown, Filter, RotateCcw, Ban, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { NewCertificateModal } from "@/components/NewCertificateModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { addDays, isBefore } from "date-fns";
import { Server } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  {
    id: 4,
    name: "Internal Server Cert",
    client: "GlobalTech Solutions",
    issueDate: "2024-03-01",
    expiryDate: "2025-03-01",
    status: "Active",
    ipAddresses: ["192.168.2.5"],
    dnsNames: ["internal.globaltech.net"],
    author: "Carol Davis",
  },
  {
    id: 5,
    name: "VPN SSL Certificate",
    client: "SecureConnect Ltd",
    issueDate: "2024-03-10",
    expiryDate: "2025-03-10",
    status: "Active",
    ipAddresses: ["10.1.1.1"],
    dnsNames: ["vpn.secureconnect.com"],
    author: "David White",
  },
  {
    id: 6,
    name: "Database Server SSL",
    client: "DataSafe Systems",
    issueDate: "2024-02-15",
    expiryDate: "2025-02-15",
    status: "Active",
    ipAddresses: ["172.16.1.10"],
    dnsNames: ["db.datasafe.net"],
    author: "Emily Green",
  },
  {
    id: 7,
    name: "Email Server Certificate",
    client: "MailCorp Inc",
    issueDate: "2024-01-25",
    expiryDate: "2025-01-25",
    status: "Active",
    ipAddresses: ["192.168.1.50"],
    dnsNames: ["mail.mailcorp.com"],
    author: "Frank Black",
  },
  {
    id: 8,
    name: "Development Server SSL",
    client: "CodeCraft Studios",
    issueDate: "2024-03-20",
    expiryDate: "2024-12-20",
    status: "Active",
    ipAddresses: ["10.0.1.20"],
    dnsNames: ["dev.codecraft.io"],
    author: "Grace Taylor",
  },
  {
    id: 9,
    name: "Staging Environment SSL",
    client: "WebDev Solutions",
    issueDate: "2024-02-28",
    expiryDate: "2025-02-28",
    status: "Active",
    ipAddresses: ["172.16.2.30"],
    dnsNames: ["staging.webdev.net"],
    author: "Harry Brown",
  },
  {
    id: 10,
    name: "Test Server Certificate",
    client: "QA Testing Ltd",
    issueDate: "2024-03-05",
    expiryDate: "2024-11-05",
    status: "Active",
    ipAddresses: ["192.168.2.80"],
    dnsNames: ["test.qatesting.com"],
    author: "Ivy Clark",
  },
  {
    id: 11,
    name: "Backup Server SSL",
    client: "DataGuard Systems",
    issueDate: "2024-01-10",
    expiryDate: "2025-01-10",
    status: "Active",
    ipAddresses: ["10.1.1.5"],
    dnsNames: ["backup.dataguard.net"],
    author: "Jack Green",
  },
  {
    id: 12,
    name: "Disaster Recovery SSL",
    client: "Resilience Corp",
    issueDate: "2024-02-05",
    expiryDate: "2025-02-05",
    status: "Active",
    ipAddresses: ["172.16.3.15"],
    dnsNames: ["dr.resilience.com"],
    author: "Kelly Blue",
  },
  {
    id: 13,
    name: "Cloud Server SSL",
    client: "SkyNet Services",
    issueDate: "2024-03-15",
    expiryDate: "2025-03-15",
    status: "Active",
    ipAddresses: ["192.168.3.100"],
    dnsNames: ["cloud.skynet.io"],
    author: "Liam Grey",
  },
  {
    id: 14,
    name: "Load Balancer SSL",
    client: "BalanceTech Inc",
    issueDate: "2024-02-20",
    expiryDate: "2024-10-20",
    status: "Active",
    ipAddresses: ["10.0.2.50"],
    dnsNames: ["lb.balancetech.com"],
    author: "Mia White",
  },
  {
    id: 15,
    name: "API Gateway SSL",
    client: "Gateway Solutions",
    issueDate: "2024-03-25",
    expiryDate: "2025-03-25",
    status: "Active",
    ipAddresses: ["172.16.4.25"],
    dnsNames: ["api.gateway.net"],
    author: "Noah Black",
  },
  {
    id: 16,
    name: "Microservice SSL",
    client: "ServiceMesh Ltd",
    issueDate: "2024-01-30",
    expiryDate: "2025-01-30",
    status: "Active",
    ipAddresses: ["192.168.4.120"],
    dnsNames: ["ms.servicemesh.com"],
    author: "Olivia Green",
  },
  {
    id: 17,
    name: "Monitoring System SSL",
    client: "WatchDog Systems",
    issueDate: "2024-02-10",
    expiryDate: "2024-09-10",
    status: "Active",
    ipAddresses: ["10.1.2.10"],
    dnsNames: ["monitor.watchdog.net"],
    author: "Peter Clark",
  },
  {
    id: 18,
    name: "Reporting Server SSL",
    client: "ReportCentral Inc",
    issueDate: "2024-03-01",
    expiryDate: "2025-03-01",
    status: "Active",
    ipAddresses: ["172.16.5.40"],
    dnsNames: ["report.reportcentral.com"],
    author: "Quinn Taylor",
  },
  {
    id: 19,
    name: "Analytics Platform SSL",
    client: "DataInsights Ltd",
    issueDate: "2024-02-15",
    expiryDate: "2025-02-15",
    status: "Active",
    ipAddresses: ["192.168.5.150"],
    dnsNames: ["analytics.datainsights.io"],
    author: "Ryan Brown",
  },
  {
    id: 20,
    name: "AI Server SSL",
    client: "AISolutions Corp",
    issueDate: "2024-03-20",
    expiryDate: "2024-12-20",
    status: "Active",
    ipAddresses: ["10.0.3.70"],
    dnsNames: ["ai.aisolutions.com"],
    author: "Sophia White",
  },
];

const initializeLocalStorage = () => {
  const storedCertificates = localStorage.getItem("certificates");
  if (!storedCertificates) {
    localStorage.setItem("certificates", JSON.stringify(TEMPLATE_CERTIFICATES));
  }
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [selectedCertificateId, setSelectedCertificateId] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Certificate | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const { toast } = useToast();

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

  const handleRenew = (id: number) => {
    setSelectedCertificateId(id);
    setShowRenewModal(true);
    // Simulate backend response after 2 seconds
    setTimeout(() => {
      setShowRenewModal(false);
      toast({
        title: "Certificate Renewed",
        description: "The certificate has been successfully renewed.",
      });
    }, 2000);
  };

  const handleInvalidate = (id: number) => {
    setCertificates(prevCerts =>
      prevCerts.map(cert =>
        cert.id === id
          ? { ...cert, status: "Expired" as const }
          : cert
      )
    );
    toast({
      title: "Certificate Invalidated",
      description: "The certificate has been invalidated.",
    });
  };

  const handleDelete = (id: number) => {
    setCertificates(prevCerts => prevCerts.filter(cert => cert.id !== id));
    toast({
      title: "Certificate Deleted",
      description: "The certificate has been permanently deleted.",
    });
  };

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

  const totalCertificates = certificates.length;
  const expiringCertificates = certificates.filter((cert) =>
    isBefore(new Date(cert.expiryDate), addDays(new Date(), 30))
  );
  const expiringCount = expiringCertificates.length;

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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCertificates.map((cert) => (
              <TableRow 
                key={cert.id}
                className={cert.status === "Expired" ? "opacity-60" : ""}
              >
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
                <TableCell>
                  <div className="flex gap-2">
                    {cert.status !== "Expired" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRenew(cert.id)}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInvalidate(cert.id)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(cert.id)}
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

      <NewCertificateModal
        open={showModal}
        onOpenChange={setShowModal}
        clients={[]}
      />

      <Dialog open={showRenewModal} onOpenChange={setShowRenewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renewing Certificate</DialogTitle>
            <DialogDescription>
              Please wait while we process your request...
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Index;
