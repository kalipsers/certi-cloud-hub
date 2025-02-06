import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  certificates: number;
}

interface NewCertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: Client[];
}

interface CertificateForm {
  name: string;
  ipAddresses: string[];
  dnsNames: string[];
  clientId: string;
  date: Date | undefined;
  validityDays: number;
}

const STORAGE_KEY = "certificate_draft";

export function NewCertificateModal({ open, onOpenChange, clients }: NewCertificateModalProps) {
  const { toast } = useToast();
  const [form, setForm] = useState<CertificateForm>({
    name: "",
    ipAddresses: [""],
    dnsNames: [""],
    clientId: "",
    date: undefined,
    validityDays: 90,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.date = parsed.date ? new Date(parsed.date) : undefined;
      setForm(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const handleSave = () => {
    // Here you would typically make an API call
    console.log("Saving certificate:", form);
    localStorage.removeItem(STORAGE_KEY);
    onOpenChange(false);
    toast({
      title: "Certificate Created",
      description: "The certificate has been created successfully.",
    });
  };

  const handleExit = () => {
    localStorage.removeItem(STORAGE_KEY);
    onOpenChange(false);
  };

  const addField = (field: 'ipAddresses' | 'dnsNames') => {
    setForm(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeField = (field: 'ipAddresses' | 'dnsNames', index: number) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateField = (field: 'ipAddresses' | 'dnsNames', index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Certificate</DialogTitle>
          <DialogDescription>
            Create a new certificate for your client.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="grid gap-2">
            <Label>IP Addresses</Label>
            {form.ipAddresses.map((ip, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={ip}
                  onChange={(e) => updateField('ipAddresses', index, e.target.value)}
                  placeholder="Enter IP address"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeField('ipAddresses', index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => addField('ipAddresses')}
              className="mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add IP Address
            </Button>
          </div>

          <div className="grid gap-2">
            <Label>DNS Names</Label>
            {form.dnsNames.map((dns, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={dns}
                  onChange={(e) => updateField('dnsNames', index, e.target.value)}
                  placeholder="Enter DNS name"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeField('dnsNames', index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => addField('dnsNames')}
              className="mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add DNS Name
            </Button>
          </div>

          <div className="grid gap-2">
            <Label>Client</Label>
            <Select
              value={form.clientId}
              onValueChange={(value) => setForm(prev => ({ ...prev, clientId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.date ? format(form.date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={form.date}
                  onSelect={(date) => setForm(prev => ({ ...prev, date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label>Validity Period (days): {form.validityDays}</Label>
            <Slider
              value={[form.validityDays]}
              onValueChange={([value]) => setForm(prev => ({ ...prev, validityDays: value }))}
              min={31}
              max={398}
              step={1}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleExit}>
            Exit
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}