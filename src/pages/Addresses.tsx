import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Plus, Edit, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

const Addresses = () => {
  // TODO: Fetch addresses from backend
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "Home",
      fullName: "Jane Doe",
      phone: "+254712345678",
      address: "123 Main Street, Apartment 4B",
      city: "Nairobi",
      postalCode: "00100",
      isDefault: true,
    },
    {
      id: "2",
      label: "Work",
      fullName: "Jane Doe",
      phone: "+254712345678",
      address: "456 Business Avenue, 5th Floor",
      city: "Nairobi",
      postalCode: "00200",
      isDefault: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleSetDefault = (id: string) => {
    // TODO: API call to set default address
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success("Default address updated");
  };

  const handleDelete = (id: string) => {
    // TODO: API call to delete address
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast.success("Address deleted");
  };

  const handleSave = (address: Address) => {
    // TODO: API call to create/update address
    if (editingAddress) {
      setAddresses(addresses.map(addr => addr.id === address.id ? address : addr));
      toast.success("Address updated");
    } else {
      setAddresses([...addresses, { ...address, id: Date.now().toString() }]);
      toast.success("Address added");
    }
    setIsDialogOpen(false);
    setEditingAddress(null);
  };

  const AddressForm = ({ address, onSave }: { address?: Address; onSave: (addr: Address) => void }) => {
    const [formData, setFormData] = useState<Address>(address || {
      id: "",
      label: "",
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      isDefault: false,
    });

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="label">Address Label</Label>
          <Input
            id="label"
            placeholder="Home, Work, etc."
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+254712345678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="address">Street Address</Label>
          <Textarea
            id="address"
            placeholder="House number, street name, apartment"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Nairobi"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              placeholder="00100"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            />
          </div>
        </div>
        <Button onClick={() => onSave(formData)} className="w-full">
          Save Address
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-heading font-bold animate-fade-in">Address Book</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingAddress(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </DialogTitle>
                </DialogHeader>
                <AddressForm address={editingAddress || undefined} onSave={handleSave} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {addresses.map((address) => (
              <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {address.label}
                      {address.isDefault && (
                        <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          <Star className="h-3 w-3 fill-current" />
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingAddress(address);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(address.id)}
                        disabled={address.isDefault}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{address.fullName}</p>
                    <p className="text-muted-foreground">{address.phone}</p>
                    <p className="text-muted-foreground">{address.address}</p>
                    <p className="text-muted-foreground">
                      {address.city}, {address.postalCode}
                    </p>
                  </div>
                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {addresses.length === 0 && (
            <Card className="p-12 text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No addresses saved</h3>
              <p className="text-muted-foreground mb-6">Add your first delivery address to get started</p>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Addresses;
