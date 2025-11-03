import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Clock, Tag, Percent } from "lucide-react";
import { mockOffers, Offer } from "@/lib/mockAdminData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const OffersManagement = () => {
  const getStatusBadge = (status: Offer['status']) => {
    const variants = {
      active: "default",
      scheduled: "secondary",
      expired: "outline",
    } as const;
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const CountdownTimer = ({ endDate }: { endDate: string }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const calculateTimeLeft = () => {
        const end = new Date(endDate).getTime();
        const now = new Date().getTime();
        const diff = end - now;

        if (diff <= 0) {
          setTimeLeft("Expired");
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      };

      calculateTimeLeft();
      const interval = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(interval);
    }, [endDate]);

    return (
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-3 w-3" />
        {timeLeft}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Offers & Promotions</h1>
          <p className="text-muted-foreground">Create and manage promotional offers</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
              <DialogDescription>Set up a promotional offer with countdown timer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Offer Title</Label>
                <Input id="title" placeholder="e.g., Summer Sale 2025" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your offer" rows={3} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Discount Type</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage Off</SelectItem>
                      <SelectItem value="flat">Flat Amount (KSH)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Discount Value</Label>
                  <Input id="value" type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code (Optional)</Label>
                <Input id="code" placeholder="e.g., SUMMER2025" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date & Time</Label>
                  <Input id="startDate" type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date & Time</Label>
                  <Input id="endDate" type="datetime-local" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minOrder">Minimum Order Amount (KSH)</Label>
                <Input id="minOrder" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxUses">Maximum Uses Per Customer</Label>
                <Input id="maxUses" type="number" placeholder="Unlimited" />
              </div>
              <div className="space-y-2">
                <Label>Apply To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="category">Specific Category</SelectItem>
                    <SelectItem value="products">Specific Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Cancel</Button>
                <Button>Create Offer</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active & Scheduled Offers</CardTitle>
          <CardDescription>Manage your promotional campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offer</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Countdown</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{offer.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {offer.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {offer.type === 'percentage' ? (
                        <Percent className="h-4 w-4" />
                      ) : (
                        <Tag className="h-4 w-4" />
                      )}
                      {offer.type === 'percentage' ? `${offer.value}%` : `KSH ${offer.value}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    {offer.code ? (
                      <Badge variant="outline">{offer.code}</Badge>
                    ) : (
                      <span className="text-muted-foreground">Auto-apply</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(offer.startDate).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">
                        to {new Date(offer.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <CountdownTimer endDate={offer.endDate} />
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {offer.usedCount} / {offer.maxUses || "∞"} uses
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(offer.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OffersManagement;
