import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Truck, CheckCircle, Clock, MapPin, Search } from "lucide-react";
import { useState } from "react";

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const orders = [
    {
      id: "ORD-2025-001",
      orderDate: "2025-01-05",
      estimatedDelivery: "2025-01-10",
      status: "shipped",
      trackingNumber: "TRK123456789",
      items: [
        { name: "Elegant Evening Dress", quantity: 1, price: 12500 },
      ],
      total: 12500,
      timeline: [
        { status: "Order Placed", date: "2025-01-05 10:30 AM", completed: true },
        { status: "Payment Confirmed", date: "2025-01-05 10:35 AM", completed: true },
        { status: "Processing", date: "2025-01-05 2:00 PM", completed: true },
        { status: "Shipped", date: "2025-01-06 9:00 AM", completed: true },
        { status: "Out for Delivery", date: "Pending", completed: false },
        { status: "Delivered", date: "Expected 2025-01-10", completed: false },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { variant: "secondary" as const, label: "Pending" },
      processing: { variant: "secondary" as const, label: "Processing" },
      shipped: { variant: "default" as const, label: "Shipped" },
      delivered: { variant: "default" as const, label: "Delivered" },
    };
    const statusConfig = config[status as keyof typeof config] || config.pending;
    return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Track Your Orders</h1>
        <p className="text-muted-foreground">Monitor your order status and delivery progress</p>
      </div>

      {/* Quick Track */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Track</CardTitle>
          <CardDescription>Enter your tracking number to see delivery status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter tracking number (e.g., TRK123456789)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>Track</Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Orders */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Order {order.id}
                    {getStatusBadge(order.status)}
                  </CardTitle>
                  <CardDescription>
                    Placed on {new Date(order.orderDate).toLocaleDateString()} • 
                    Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{order.trackingNumber}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">KSH {item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t mt-4">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">KSH {order.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div>
                <h3 className="font-semibold mb-4">Delivery Progress</h3>
                <div className="space-y-4">
                  {order.timeline.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "rounded-full p-2",
                          step.completed
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}>
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        {idx < order.timeline.length - 1 && (
                          <div className={cn(
                            "w-0.5 h-12",
                            step.completed ? "bg-primary" : "bg-muted"
                          )} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className={cn(
                          "font-medium",
                          step.completed ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {step.status}
                        </p>
                        <p className="text-sm text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Package className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" className="flex-1">
                  <Truck className="h-4 w-4 mr-2" />
                  Contact Courier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default OrderTracking;
