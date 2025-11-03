import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Printer, Mail, Truck, Package, CheckCircle, Clock } from "lucide-react";
import { mockOrders, Order } from "@/lib/mockAdminData";
import { toast } from "sonner";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = mockOrders.find(o => o.id === id);
  
  const [status, setStatus] = useState(order?.status || "pending");
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || "");

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-heading font-bold mb-4">Order Not Found</h2>
        <Button onClick={() => navigate("/admin/orders")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
      </div>
    );
  }

  // TODO: Backend - Implement order status update API
  const handleUpdateStatus = () => {
    toast.success("Order status updated!");
  };

  // TODO: Backend - Implement tracking number update API
  const handleUpdateTracking = () => {
    toast.success("Tracking number updated!");
  };

  // TODO: Backend - Send notification to customer
  const handleNotifyCustomer = () => {
    toast.success("Customer notification sent!");
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      pending: "secondary",
      paid: "default",
      processing: "default",
      shipped: "default",
      delivered: "default",
      cancelled: "destructive",
      returned: "outline",
    } as const;
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getStatusIcon = (orderStatus: Order['status']) => {
    switch (orderStatus) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "processing":
        return <Package className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/orders")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-heading font-bold">Order Details</h1>
            <p className="text-muted-foreground">Order #{order.orderNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleNotifyCustomer}>
            <Mail className="h-4 w-4 mr-2" />
            Notify Customer
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print Invoice
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Status Timeline */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["pending", "paid", "processing", "shipped", "delivered"].map((s, idx) => {
                const isComplete = ["pending", "paid", "processing", "shipped", "delivered"].indexOf(order.status) >= idx;
                const isCurrent = order.status === s;
                
                return (
                  <div key={s} className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${isComplete ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      {getStatusIcon(s as Order['status'])}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium capitalize ${isCurrent ? "text-primary" : ""}`}>
                          {s}
                        </span>
                        {isCurrent && getStatusBadge(order.status)}
                      </div>
                      {isComplete && (
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Update Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as Order['status'])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full" onClick={handleUpdateStatus}>
                Update Status
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Tracking Number</Label>
              <Input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
              />
              <Button className="w-full" variant="outline" onClick={handleUpdateTracking}>
                <Truck className="h-4 w-4 mr-2" />
                Update Tracking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer & Order Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-muted-foreground">Name</Label>
              <p className="font-medium">{order.customer.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p>{order.customer.email}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Phone</Label>
              <p>{order.customer.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{order.shippingAddress}</p>
            {order.trackingNumber && (
              <div className="mt-4">
                <Label className="text-muted-foreground">Tracking Number</Label>
                <p className="font-mono font-medium">{order.trackingNumber}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center pb-4 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity} × KSH {item.price.toLocaleString()}
                  </p>
                </div>
                <p className="font-medium">KSH {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>KSH {order.total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetail;
